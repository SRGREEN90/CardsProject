import {instance} from "./api";

export const cardsApi = {
    getCards(params: Partial<GetCardsParamsType>) {
        return instance.get('/cards/card', {params: {...params}});
    },
    addCard: (newCard: Partial<CardType>) => {
        return instance.post('/cards/pack', {newCard: {...newCard}})
    },
    deleteCard: (id: string) => {
        return instance.delete('/cards/card', {params: {id: id}})
    },
    updateCard: (UpdatedCard: Partial<CardType>) => {
        return instance.put('/cards/card', {updatedCard: {...UpdatedCard}})
    },
}

export type GetCardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string // обязательно!
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}

export type CardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    token: string
    tokenDeathTime: number
    // "packUserId": "61b5e9866555340004202106",
    // "page": 1,
    // "pageCount": 4,
    // "cardsTotalCount": 2,
    // "minGrade": 0,
    // "maxGrade": 6,
    // "token": "84810400-a26f-11ec-bf8b-b331e9adfac0",
    // "tokenDeathTime": 1647740838976
}

export type CardType = {
    _id: string
    cardsPack_id: string  // ОБЯЗАТЕЛЬНОЕ ЗНАЧЕНИЕ ДЛЯ ДОБАВЛЕНИЯ И ИЗМЕНЕНИЯ
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: 0,
    answerImg: string
    answerVideo: string
    questionImg: string
    questionVideo: string
    // "_id": "622ba17229bee9000469655e",
    // "cardsPack_id": "61c23d74b4e18c0004e4392f",
    // "user_id": "61b5e9866555340004202106",
    // "answer": "no answer",
    // "question": "WTF?",
    // "grade": 0,
    // "shots": 0,
    // "comments": "",
    // "type": "card",
    // "rating": 0,
    // "more_id": "61b5e9866555340004202106",
    // "created": "2022-03-11T19:22:26.150Z",
    // "updated": "2022-03-12T17:49:54.582Z",
    // "__v": 0,
    // "answerImg": "",
    // "answerVideo": "",
    // "questionImg": "",
    // "questionVideo": ""
}

export type AddCardParamsType = {}

export type UpdateCardType = {
    _id: string
    question: string
    comments: string
};
