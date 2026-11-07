#!/usr/bin/env python3
"""
Motor RAG (Retrieval-Augmented Generation) Oficial - Cámara de Comercio de Alajuela (CCA)
Implementación Real en Python 3 para Consultoría de Arquitectura de Información EIF-511 UNA

Funcionamiento:
1. Ingesta el corpus documental institucional de la CCA (Estatutos, Tarifas, Requisitos, Convenios).
2. Segmenta en fragmentos semánticos (Chunks) con metadatos de sección.
3. Vectoriza los chunks y calcula similitud coseno ante preguntas del usuario.
4. Recupera los fragmentos con mayor relevancia estadística.
5. Genera una respuesta institucional fundamentada con citación estricta de fuentes.

Uso:
  python rag_asistente_cca.py --query="¿Cuáles son los requisitos y costo de afiliar mi negocio?"
  python rag_asistente_cca.py --interactive
"""

import sys
import os
import re
import math
from collections import Counter

# Asegurar codificación UTF-8 en terminales de Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

CORPUS_PATH = os.path.join(os.path.dirname(__file__), "cca_corpus_institucional.txt")

# Diccionario de palabras vacías (Stopwords) en español
STOPWORDS = {
    "de", "la", "que", "el", "en", "y", "a", "los", "del", "se", "las", "por", "un", "para",
    "con", "no", "una", "su", "al", "lo", "como", "más", "pero", "sus", "le", "ya", "o", "este",
    "sí", "porque", "esta", "son", "entre", "está", "cuando", "muy", "sin", "sobre", "también",
    "me", "hasta", "hay", "donde", "quien", "desde", "todo", "nos", "durante", "todos", "uno",
    "les", "ni", "contra", "otros", "ese", "eso", "ante", "ellos", "e", "esto", "mí", "antes",
    "algunos", "qué", "unos", "yo", "otro", "otras", "otra", "él", "tanto", "esa", "estos", "mucho",
    "quienes", "nada", "muchos", "cual", "poco", "ella", "estar", "estas", "algunas", "algo", "nosotros"
}

def tokenize(text):
    """Limpia y tokeniza el texto aplicando filtrado de stopwords."""
    words = re.findall(r'\b[a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9]{3,}\b', text.lower())
    return [w for w in words if w not in STOPWORDS]

def compute_tf(tokens):
    """Calcula la frecuencia de términos normalizada."""
    counts = Counter(tokens)
    total = len(tokens)
    if total == 0:
        return {}
    return {word: count / total for word, count in counts.items()}

def compute_idf(corpus_tokens):
    """Calcula el IDF para cada término en el corpus."""
    n_docs = len(corpus_tokens)
    idf = {}
    all_words = set(w for tokens in corpus_tokens for w in tokens)
    for word in all_words:
        doc_count = sum(1 for tokens in corpus_tokens if word in tokens)
        idf[word] = math.log((n_docs + 1) / (doc_count + 1)) + 1.0
    return idf

def tf_idf_vector(tf, idf):
    """Genera vector de pesos TF-IDF."""
    return {word: score * idf.get(word, 1.0) for word, score in tf.items()}

def cosine_similarity(vec1, vec2):
    """Calcula la similitud coseno entre dos vectores dispersos."""
    common_words = set(vec1.keys()).intersection(set(vec2.keys()))
    if not common_words:
        return 0.0
    dot_product = sum(vec1[w] * vec2[w] for w in common_words)
    norm1 = math.sqrt(sum(val ** 2 for val in vec1.values()))
    norm2 = math.sqrt(sum(val ** 2 for val in vec2.values()))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot_product / (norm1 * norm2)

class CCARagEngine:
    def __init__(self, corpus_file):
        self.chunks = []
        self.chunk_tokens = []
        self.idf = {}
        self.chunk_vectors = []
        self.load_and_index(corpus_file)

    def load_and_index(self, corpus_file):
        if not os.path.exists(corpus_file):
            raise FileNotFoundError(f"No se encontró el corpus en {corpus_file}")
        
        with open(corpus_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Segmentación por secciones delimitadas por [SECCIÓN ...]
        raw_sections = re.split(r'(\[SECCIÓN\s+\d+:[^\]]+\])', content)
        
        current_header = "Introducción Institucional"
        for part in raw_sections:
            part = part.strip()
            if not part:
                continue
            if part.startswith("[SECCIÓN"):
                current_header = part
            else:
                self.chunks.append({
                    "header": current_header,
                    "text": part
                })
        
        # Tokenización de cada chunk
        self.chunk_tokens = [tokenize(c["text"] + " " + c["header"]) for c in self.chunks]
        self.idf = compute_idf(self.chunk_tokens)
        self.chunk_vectors = [
            tf_idf_vector(compute_tf(tokens), self.idf)
            for tokens in self.chunk_tokens
        ]

    def query(self, question, top_k=2):
        """Recupera los top-K chunks y genera la respuesta fundamentada."""
        q_tokens = tokenize(question)
        if not q_tokens:
            return {
                "answer": "Por favor formule una consulta con términos específicos sobre afiliación, convenios o servicios de la Cámara.",
                "sources": []
            }
        
        q_tf = compute_tf(q_tokens)
        q_vector = tf_idf_vector(q_tf, self.idf)

        scores = []
        for i, doc_vector in enumerate(self.chunk_vectors):
            sim = cosine_similarity(q_vector, doc_vector)
            scores.append((sim, i))
        
        scores.sort(key=lambda x: x[0], reverse=True)
        top_results = [scores[i] for i in range(min(top_k, len(scores)))]

        retrieved_chunks = []
        for sim, idx in top_results:
            if sim > 0.05:  # Umbral de significancia
                retrieved_chunks.append({
                    "score": round(sim, 4),
                    "section": self.chunks[idx]["header"],
                    "content": self.chunks[idx]["text"]
                })

        if not retrieved_chunks:
            return {
                "answer": "No se encontraron reglamentos o directrices específicas en el corpus de la CCA para su consulta. Por favor contacte directamente al WhatsApp institucional 8492-3925.",
                "sources": []
            }

        # Generador de Respuesta Sintetizada
        primary = retrieved_chunks[0]
        answer = f"Fundamentado en los estatutos y normativas de la Cámara de Comercio de Alajuela ({primary['section']}):\n\n"
        
        # Resumen estructurado del texto recuperado
        lines = [line.strip() for line in primary['content'].split('\n') if line.strip()]
        answer += "\n".join(lines[:6])
        
        if len(retrieved_chunks) > 1 and retrieved_chunks[1]['score'] > 0.15:
            sec = retrieved_chunks[1]
            answer += f"\n\nInformación complementaria ({sec['section']}):\n"
            sec_lines = [l.strip() for l in sec['content'].split('\n') if l.strip()]
            answer += "\n".join(sec_lines[:4])

        return {
            "answer": answer,
            "sources": retrieved_chunks
        }

def main():
    rag = CCARagEngine(CORPUS_PATH)
    
    print("=" * 75)
    print("🤖 SISTEMA RAG (RETRIEVAL-AUGMENTED GENERATION) - CÁMARA COMERCIO ALAJUELA")
    print("=" * 75)
    print(f"📚 Base de Conocimiento Activa: {len(rag.chunks)} secciones semánticas indizadas.\n")

    # Modo Interactivo
    if "--interactive" in sys.argv:
        print("💡 Modo Interactivo iniciado. Escriba su consulta (o 'salir' para terminar):\n")
        while True:
            try:
                user_q = input("Consulta CCA > ").strip()
                if not user_q or user_q.lower() in ("salir", "exit", "quit"):
                    break
                result = rag.query(user_q)
                print("\n" + "-" * 75)
                print("RESPUESTA INSTITUCIONAL FUNDAMENTADA:")
                print("-" * 75)
                print(result["answer"])
                print("\nFUENTES DE ARQUITECTURA RECUPERADAS:")
                for s in result["sources"]:
                    print(f"  • {s['section']} (Similitud Coseno: {s['score']})")
                print("=" * 75 + "\n")
            except (KeyboardInterrupt, EOFError):
                break
        return

    # Modo por Parámetro --query
    query_param = None
    for arg in sys.argv[1:]:
        if arg.startswith("--query="):
            query_param = arg.split("=", 1)[1]

    if not query_param:
        query_param = "¿Cuáles son los requisitos y costo mensual para afiliar mi pyme comercial a la Cámara de Comercio de Alajuela?"
        print(f"ℹ️ No se especificó consulta. Ejecutando caso de prueba representativo:")
        print(f"   Pregunta: \"{query_param}\"\n")

    result = rag.query(query_param)
    print("-" * 75)
    print("RESPUESTA GENERADA (ZERO ALUCINACIONES):")
    print("-" * 75)
    print(result["answer"])
    print("\nFUENTES RECUPERADAS (RETRIEVAL RANKING):")
    for s in result["sources"]:
        print(f"  • {s['section']} (Similitud Coseno: {s['score']})")
    print("=" * 75)

if __name__ == "__main__":
    main()
