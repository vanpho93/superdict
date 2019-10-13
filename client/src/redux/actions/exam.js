export const addVocabulary = (vocabulary) => ({ type: 'ADD_VOCABULARY', vocabularyId: vocabulary.vocabularyId })

export const removeVocabulary = (vocabulary) => ({ type: 'REMOVE_VOCABULARY', vocabularyId: vocabulary.vocabularyId })
