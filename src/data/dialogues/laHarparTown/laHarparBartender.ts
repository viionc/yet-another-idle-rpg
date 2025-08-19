import { QuestID } from '../../../enums/ids/quest-id.enum'
import { DialogueNode } from '../../../interfaces/dialogues/dialogue-node.interface'

enum laHarparBartenderConversationID {
    introduction1 = 0,
    introduction2 = 1,
    default = 2,
    whatIsThisPlace1 = 3,
    anyWorkForMe1 = 4,
    anyoneWhoCanTrainMe1 = 5,
    anyoneWhoCanTrainMe2 = 6,
    anyWorkForMe2 = 7,
}

export type LaHarparBartenderDialogueType = Record<laHarparBartenderConversationID, DialogueNode<laHarparBartenderConversationID>>

const LA_HARPAR_BARTENDER: LaHarparBartenderDialogueType = {
    [laHarparBartenderConversationID.introduction1]: {
        id: laHarparBartenderConversationID.introduction1,
        messageKey: 'dialogues/laHarparBartender:introduction1.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:introduction1.opt1',
                next: laHarparBartenderConversationID.introduction2,
            },
            {
                responseKey: 'dialogues/laHarparBartender:introduction1.opt2',
                next: laHarparBartenderConversationID.default,
            },
        ],
    },
    [laHarparBartenderConversationID.introduction2]: {
        id: laHarparBartenderConversationID.introduction2,
        messageKey: 'dialogues/laHarparBartender:introduction2.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:introduction2.opt1',
                next: laHarparBartenderConversationID.default,
            },
        ],
    },
    [laHarparBartenderConversationID.default]: {
        id: laHarparBartenderConversationID.default,
        messageKey: 'dialogues/laHarparBartender:default.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:default.beer',
                next: laHarparBartenderConversationID.default,
                conditions: [{ type: 'questStep', questId: QuestID.meatShortage, step: 1 }],
                effects: { type: 'quest', action: 'end', questId: QuestID.meatShortage },
            },
            {
                responseKey: 'dialogues/laHarparBartender:default.whatIsThisPlace',
                next: laHarparBartenderConversationID.whatIsThisPlace1,
                effects: { type: 'stat', stats: [{ key: 'goldCoins', amount: 20 }] },
            },
            {
                responseKey: 'dialogues/laHarparBartender:default.anyWork',
                next: laHarparBartenderConversationID.anyWorkForMe1,
                effects: { type: 'stat', stats: [{ key: 'goldCoins', amount: 40 }] },
            },
            {
                responseKey: 'dialogues/laHarparBartender:default.anyTrainer',
                next: laHarparBartenderConversationID.anyoneWhoCanTrainMe1,
                effects: { type: 'stat', stats: [{ key: 'goldCoins', amount: 60 }] },
            },
            {
                responseKey: 'dialogues/laHarparBartender:default.goodbye',
                next: laHarparBartenderConversationID.default,
                closeDialogue: true,
            },
        ],
    },
    [laHarparBartenderConversationID.whatIsThisPlace1]: {
        id: laHarparBartenderConversationID.whatIsThisPlace1,
        messageKey: 'dialogues/laHarparBartender:whatIsThisPlace1.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:whatIsThisPlace1.opt1',
                next: laHarparBartenderConversationID.default,
            },
        ],
    },
    [laHarparBartenderConversationID.anyWorkForMe1]: {
        id: laHarparBartenderConversationID.anyWorkForMe1,
        messageKey: 'dialogues/laHarparBartender:anyWorkForMe1.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:anyWorkForMe1.accept',
                next: laHarparBartenderConversationID.default,
                effects: { type: 'quest', action: 'start', questId: QuestID.meatShortage },
            },
            {
                responseKey: 'dialogues/laHarparBartender:anyWorkForMe1.decline',
                next: laHarparBartenderConversationID.default,
            },
        ],
    },
    [laHarparBartenderConversationID.anyoneWhoCanTrainMe1]: {
        id: laHarparBartenderConversationID.anyoneWhoCanTrainMe1,
        messageKey: 'dialogues/laHarparBartender:anyoneWhoCanTrainMe1.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:anyoneWhoCanTrainMe1.opt1',
                next: laHarparBartenderConversationID.default,
            },
            {
                responseKey: 'dialogues/laHarparBartender:anyoneWhoCanTrainMe1.opt2',
                next: laHarparBartenderConversationID.anyoneWhoCanTrainMe2,
            },
        ],
    },
    [laHarparBartenderConversationID.anyoneWhoCanTrainMe2]: {
        id: laHarparBartenderConversationID.anyoneWhoCanTrainMe2,
        messageKey: 'dialogues/laHarparBartender:anyoneWhoCanTrainMe2.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:anyoneWhoCanTrainMe2.opt1',
                next: laHarparBartenderConversationID.default,
                closeDialogue: true,
            },
        ],
    },
    [laHarparBartenderConversationID.anyWorkForMe2]: {
        id: laHarparBartenderConversationID.anyWorkForMe2,
        messageKey: 'dialogues/laHarparBartender:anyWorkForMe2.message',
        options: [
            {
                responseKey: 'dialogues/laHarparBartender:anyWorkForMe2.opt1',
                next: laHarparBartenderConversationID.default,
                closeDialogue: true,
            },
        ],
    },
}

export default LA_HARPAR_BARTENDER


// import { DialogueProps } from '../types'
// import { QuestID } from '../../../enums/ids/quest-id.enum'
//
// enum ConversationId {
//     introduction1 = 0,
//     introduction2 = 1,
//     default = 2,
//     whatIsThisPlace1 = 3,
//     anyWorkForMe1 = 4,
//     anyoneWhoCanTrainMe1 = 5,
//     anyoneWhoCanTrainMe2 = 6,
//     anyWorkForMe2 = 7,
// }
//
// const LA_HARPAR_BARTENDER: Record<number, DialogueProps> = {
//     [ConversationId.introduction1]: {
//         message: 'Oi, you! Quick, what do you want?! Can\'t you see how busy this place is?',
//         options: [
//             {
//                 response: 'Looks quite empty to me.',
//                 next: ConversationId.introduction2,
//             },
//             { response: 'I\'m sorry, I have a few questions, if you may.', next: ConversationId.default },
//         ],
//     },
//     [ConversationId.introduction2]: {
//         message: 'I\'ll remember your face, smartass. Next order is gonna cost you more.',
//         options: [
//             { response: 'I\'m sorry, I have few questions if you may.', next: ConversationId.default },
//         ],
//     },
//     [ConversationId.default]: {
//         message: 'Ask away, my answers have prices though.',
//         options: [
//             {
//                 response: 'I\'m going to need a beer to forget what I did.',
//                 next: ConversationId.default,
//                 requiredQuestProgress: {
//                     questId: QuestID.meatShortage,
//                     step: 1,
//                 },
//                 specialResponse: {
//                     type: 'quest',
//                     questId: QuestID.meatShortage,
//                     doesEndQuest: true,
//                 },
//             },
//             {
//                 response: 'What is this place?',
//                 next: ConversationId.whatIsThisPlace1,
//                 specialResponse: {
//                     type: 'stat',
//                     key: 'goldCoins',
//                     amount: 20,
//                 },
//             },
//             {
//                 response: 'Do you have any work for me?',
//                 next: ConversationId.anyWorkForMe1,
//                 specialResponse: {
//                     type: 'stat',
//                     key: 'goldCoins',
//                     amount: 40,
//                 },
//             },
//             {
//                 response: 'Do you know anyone who could train me?',
//                 next: ConversationId.anyoneWhoCanTrainMe1,
//                 specialResponse: {
//                     type: 'stat',
//                     key: 'goldCoins',
//                     amount: 60,
//                 },
//             },
//             {
//                 response: 'That\'s all for now. Have a good day.',
//                 next: ConversationId.default,
//                 closeDialogue: true,
//             },
//         ],
//     },
//     [ConversationId.whatIsThisPlace1]: {
//         message: 'A tavern. Are you blind? That will be 20 coins well spent.',
//         options: [{ response: 'Well, can\'t argue with that.', next: ConversationId.default }],
//     },
//     [ConversationId.anyWorkForMe1]: {
//         message:
//             'Yes! All those lazy rats hanging out here made me run out of crab meat. Bring me 50 pieces and I\'ll give you your money back and toss something extra.',
//         options: [
//             {
//                 response: 'I\'m on it, boss.',
//                 next: ConversationId.default,
//                 nextIfQuestStarted: ConversationId.anyWorkForMe2,
//                 specialResponse: { type: 'quest', questId: QuestID.meatShortage, doesStartQuest: true },
//             },
//             {
//                 response: 'I think I\'ll pass. (You will have to pay again if you change your mind)',
//                 next: ConversationId.default,
//             },
//         ],
//     },
//     [ConversationId.anyoneWhoCanTrainMe1]: {
//         message: 'I think Marvin specializes in combat training, you could ask him, but he is more gold-hungry than me, so prepare your gold pouch.',
//         options: [
//             {
//                 response: 'Thanks. I\'ll look for him.',
//                 next: ConversationId.default,
//             },
//             {
//                 response: 'More gold hungry than you? I don\'t think that\'s possible.',
//                 next: ConversationId.anyoneWhoCanTrainMe2,
//             },
//         ],
//     },
//     [ConversationId.anyoneWhoCanTrainMe2]: {
//         message: 'Hmmph. Go away.',
//         options: [{ response: '...', next: ConversationId.default, closeDialogue: true }],
//     },
//     [ConversationId.anyWorkForMe2]: {
//         message: 'Nothing new currently. Check again later.',
//         options: [
//             {
//                 response: 'Cheers.',
//                 next: ConversationId.default,
//                 closeDialogue: true,
//             },
//         ],
//     },
// }
//
// export default LA_HARPAR_BARTENDER
