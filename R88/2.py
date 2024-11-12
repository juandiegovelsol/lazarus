def count_word_frequencies(sentences):
    """
    Counts and organizes unique word frequencies within each sentence of the dataset.

    Args:
        sentences (list): A list of sentences.

    Returns:
        dict: A dictionary where each unique word is a key with a sub-dictionary as its value.
              The sub-dictionary maps each word to both the count of that word and the index positions of its first and last occurrences in the sentences.
    """

    # Initialize an empty dictionary to store word frequencies and their positions
    word_frequencies = {}

    # Initialize a counter to keep track of the sentence index
    sentence_index = 0

    # Iterate over each sentence in the list of sentences
    for sentence in sentences:
        # Remove leading and trailing whitespace from the sentence
        sentence = sentence.strip()

        # If the sentence is not empty after removing whitespace
        if sentence:
            # Split the sentence into words
            words = sentence.split()

            # Initialize a counter to keep track of the word index within the sentence
            word_index = 0

            # Iterate over each word in the sentence
            for word in words:
                # Remove punctuation from the word
                word = ''.join(e for e in word if e.isalnum()).lower()

                # If the word is 3 characters or longer
                if len(word) >= 3:
                    # If the word is not already in the word_frequencies dictionary
                    if word not in word_frequencies:
                        # Add the word to the dictionary with a count of 1 and its first and last positions
                        word_frequencies[word] = {'count': 1, 'first_position': (sentence_index, word_index), 'last_position': (sentence_index, word_index)}
                    else:
                        # If the word is already in the dictionary, increment its count and update its last position
                        word_frequencies[word]['count'] += 1
                        word_frequencies[word]['last_position'] = (sentence_index, word_index)

                # Increment the word index
                word_index += 1

        # Increment the sentence index
        sentence_index += 1

    return word_frequencies


# Example usage:
sentences = [
    "This is a test sentence.",
    "The sentence is just a test.",
    "If this were a real emergency, you would be instructed to panic."
]

result = count_word_frequencies(sentences)
for word, frequency in result.items():
    print(f"{word}: {frequency}")