def count_word_frequencies(sentences):
    """
    Count and organize unique word frequencies within each sentence of the dataset.

    Args:
        sentences (list): A list of sentences.

    Returns:
        dict: A dictionary where each unique word is a key with a sub-dictionary as its value.
              The sub-dictionary maps each word to both the count of that word and the index positions of its first and last occurrences in the sentences.
    """
    word_frequencies = {}
    word_first_occurrence = {}
    word_last_occurrence = {}

    for i, sentence in enumerate(sentences):
        words = sentence.split()
        for word in words:
            # Remove punctuation and convert to lower case
            cleaned_word = ''.join(e for e in word if e.isalnum()).lower()
            if len(cleaned_word) < 3:
                continue
            if cleaned_word not in word_frequencies:
                word_frequencies[cleaned_word] = {'count': 1, 'first_occurrence': i, 'last_occurrence': i}
                word_first_occurrence[cleaned_word] = i
            else:
                word_frequencies[cleaned_word]['count'] += 1
                word_frequencies[cleaned_word]['last_occurrence'] = i

    # Sort the word frequencies by first occurrence
    sorted_word_frequencies = dict(sorted(word_frequencies.items(), key=lambda item: word_first_occurrence[item[0]]))

    return sorted_word_frequencies

# Example usage:
sentences = [
    "This is a test sentence.",
    "The sentence is just a test.",
    "Test sentence is only for demonstration purposes.",
    "Do not use it in production!"
]

word_frequencies = count_word_frequencies(sentences)
for word, frequency in word_frequencies.items():
    print(f"{word}: {frequency}")