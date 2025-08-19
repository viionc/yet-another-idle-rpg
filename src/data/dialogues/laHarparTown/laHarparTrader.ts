import { DialogueNode } from '../../../interfaces/dialogues/dialogue-node.interface'
import { QuestID } from '../../../enums/ids/quest-id.enum'

enum TraderConversationId {
    intro1 = 0,
    intro2 = 1,
    intro3 = 2,
    default = 3,
    aboutMe = 4,
    aboutLiving = 5,
    aboutVillage = 10,
    aboutFishermen = 11,
    aboutFishQuality = 12,
    aboutPeople = 15,
    aboutGuild = 16,
    aboutDanger = 17,
    questOffer = 20,
    questCompleted = 21,
}

export type LaHarparTraderDialogueType = Record<TraderConversationId, DialogueNode<TraderConversationId>>

const LA_HARPAR_TRADER: LaHarparTraderDialogueType = {
    [TraderConversationId.intro1]: {
        id: TraderConversationId.intro1,
        messageKey: 'laHarparTrader:intro1.message',
        options: [{ responseKey: 'laHarparTrader:intro1.opt1', next: TraderConversationId.intro2 }],
    },
    [TraderConversationId.intro2]: {
        id: TraderConversationId.intro2,
        messageKey: 'laHarparTrader:intro2.message',
        options: [{ responseKey: 'laHarparTrader:intro2.opt1', next: TraderConversationId.intro3 }],
    },
    [TraderConversationId.intro3]: {
        id: TraderConversationId.intro3,
        messageKey: 'laHarparTrader:intro3.message',
        options: [{ responseKey: 'laHarparTrader:intro3.opt1', next: TraderConversationId.default }],
    },
    [TraderConversationId.default]: {
        id: TraderConversationId.default,
        messageKey: 'laHarparTrader:default.message',
        options: [
            {
                responseKey: 'laHarparTrader:default.opt1',
                next: TraderConversationId.default,
                conditions: [{ type: 'questStep', questId: QuestID.ratsWereRats, step: 1 }],
                effects: { type: 'quest', action: 'end', questId: QuestID.ratsWereRats },
            },
            {
                responseKey: 'laHarparTrader:default.opt2',
                next: TraderConversationId.default,
                effects: { type: 'shop', shopId: 0 },
                closeDialogue: true,
            },
            { responseKey: 'laHarparTrader:default.opt3', next: TraderConversationId.aboutMe },
            { responseKey: 'laHarparTrader:default.opt4', next: TraderConversationId.aboutVillage },
            { responseKey: 'laHarparTrader:default.opt5', next: TraderConversationId.aboutPeople },
            { responseKey: 'laHarparTrader:default.opt6', next: TraderConversationId.questOffer },
        ],
    },
    [TraderConversationId.aboutMe]: {
        id: TraderConversationId.aboutMe,
        messageKey: 'laHarparTrader:aboutMe.message',
        options: [
            { responseKey: 'laHarparTrader:aboutMe.opt1', next: TraderConversationId.aboutLiving },
            { responseKey: 'laHarparTrader:aboutMe.opt2', next: TraderConversationId.aboutPeople },
        ],
    },
    [TraderConversationId.aboutLiving]: {
        id: TraderConversationId.aboutLiving,
        messageKey: 'laHarparTrader:aboutLiving.message',
        options: [{ responseKey: 'laHarparTrader:aboutLiving.opt1', next: TraderConversationId.default }],
    },
    [TraderConversationId.aboutVillage]: {
        id: TraderConversationId.aboutVillage,
        messageKey: 'laHarparTrader:aboutVillage.message',
        options: [
            { responseKey: 'laHarparTrader:aboutVillage.opt1', next: TraderConversationId.aboutFishermen },
            { responseKey: 'laHarparTrader:aboutVillage.opt2', next: TraderConversationId.default },
        ],
    },
    [TraderConversationId.aboutFishermen]: {
        id: TraderConversationId.aboutFishermen,
        messageKey: 'laHarparTrader:aboutFishermen.message',
        options: [{ responseKey: 'laHarparTrader:aboutFishermen.opt1', next: TraderConversationId.aboutFishQuality }],
    },
    [TraderConversationId.aboutFishQuality]: {
        id: TraderConversationId.aboutFishQuality,
        messageKey: 'laHarparTrader:aboutFishQuality.message',
        options: [{ responseKey: 'laHarparTrader:aboutFishQuality.opt1', next: TraderConversationId.default }],
    },
    [TraderConversationId.aboutPeople]: {
        id: TraderConversationId.aboutPeople,
        messageKey: 'laHarparTrader:aboutPeople.message',
        options: [{ responseKey: 'laHarparTrader:aboutPeople.opt1', next: TraderConversationId.aboutGuild }],
    },
    [TraderConversationId.aboutGuild]: {
        id: TraderConversationId.aboutGuild,
        messageKey: 'laHarparTrader:aboutGuild.message',
        options: [
            { responseKey: 'laHarparTrader:aboutGuild.opt1', next: TraderConversationId.default },
            { responseKey: 'laHarparTrader:aboutGuild.opt2', next: TraderConversationId.aboutDanger },
        ],
    },
    [TraderConversationId.aboutDanger]: {
        id: TraderConversationId.aboutDanger,
        messageKey: 'laHarparTrader:aboutDanger.message',
        options: [{ responseKey: 'laHarparTrader:aboutDanger.opt1', next: TraderConversationId.default }],
    },
    [TraderConversationId.questOffer]: {
        id: TraderConversationId.questOffer,
        messageKey: 'laHarparTrader:questOffer.message',
        options: [
            {
                responseKey: 'laHarparTrader:questOffer.opt1',
                next: TraderConversationId.default,
                closeDialogue: true,
                effects: { questId: QuestID.ratsWereRats, type: 'quest', action: 'start' },
                nextIfQuestStarted: TraderConversationId.questCompleted,
            },
            { responseKey: 'laHarparTrader:questOffer.opt2', next: TraderConversationId.default },
        ],
    },
    [TraderConversationId.questCompleted]: {
        id: TraderConversationId.questCompleted,
        messageKey: 'laHarparTrader:questCompleted.message',
        options: [{ responseKey: 'laHarparTrader:questCompleted.opt1', next: TraderConversationId.default }],
    },
}

export default LA_HARPAR_TRADER

// import { DialogueProps } from '../types'
//
// const LA_HARPAR_TRADER: Record<number, DialogueProps> = {
//     0: {
//         message: 'Welcome to the best shop in La Harpar!',
//         options: [
//             {
//                 response: 'Isn\'t it the only shop here?',
//                 next: 1,
//             },
//         ],
//     },
//     1: {
//         message: 'Well, yes... That\'s what makes it the best one!',
//         options: [
//             {
//                 response: 'What are you selling then?',
//                 next: 2,
//             },
//         ],
//     },
//     2: {
//         message: 'All kinds of goods. Materials, food, equipment, and any essential items you will need during your adventures.',
//         options: [
//             {
//                 response: 'Let\'s see then.',
//                 next: 3,
//             },
//         ],
//     },
//     3: {
//         message: 'Are you buying something?',
//         options: [
//             {
//                 response: 'Your basement is rat-free. I need to take a bath though.',
//                 next: 3,
//                 requiredQuestProgress: {
//                     questId: 2,
//                     step: 1,
//                 },
//                 specialResponse: {
//                     type: 'quest',
//                     id: 2,
//                     end: true,
//                 },
//             },
//             { response: 'Let me see your wares.', next: 3, opensShop: true, closeDialogue: true },
//             { response: 'Tell me something about you.', next: 4 },
//             { response: 'What can you tell me about La Harpar?.', next: 10 },
//             { response: 'Any people I should meet?.', next: 15 },
//             { response: 'Do you need help with anything?.', next: 20 },
//         ],
//     },
//     4: {
//         message: 'I\'m La Harpar\'s most charismatic laHarparTrader: Born and raised here.',
//         options: [
//             { response: 'How is living here, anything interesting to do?', next: 5 },
//             { response: 'You must know everyone here then, right?', next: 15 },
//         ],
//     },
//     5: {
//         message:
//             'Not much. It\'s pretty calm around here. Other than crab infestation on the beach. I heard Josh is looking for someone to help with that.',
//         options: [
//             {
//                 response: 'I\'ll look for him.',
//                 next: 3,
//             },
//         ],
//     },
//     10: {
//         message: 'La Harpar is the biggest fish exporter in Port Stockmar. Our fishermen are known in all four regions, aye.',
//         options: [
//             {
//                 response: 'What makes them so famous?',
//                 next: 11,
//             },
//             { response: 'Hmm, I\'ve heard enough.', next: 3 },
//         ],
//     },
//     11: {
//         message:
//             'Our sea has the best quality fish and our fishermen are experts, with decades of expertise. This village has been a vital part of North Lirold for a long time.',
//         options: [
//             {
//                 response: 'So it\'s the fish that does all the work, I see.',
//                 next: 12,
//             },
//         ],
//     },
//     12: {
//         message: 'Well quality of fish is obviously important, but it requires a lot of work to catch and prepare them properly.',
//         options: [
//             {
//                 response: 'Okay, let me ask something else.',
//                 next: 3,
//             },
//         ],
//     },
//     15: {
//         message:
//             'There is Josh in Tavern, he is a good guy, but drinks too much. Tavern is always busy so Bartender for sure is looking for some help. Marvin is back from his expedition, you can find him somewhere around the guild.',
//         options: [
//             {
//                 response: 'Guild?',
//                 next: 16,
//             },
//         ],
//     },
//     16: {
//         message: 'Exploration Guild. Main rest point for local adventures. You should visit them, they can help you prepare.',
//         options: [
//             {
//                 response: 'I\'ll definitely go there.',
//                 next: 3,
//             },
//             {
//                 response: 'I don\'t need help, I can do well on my own.',
//                 next: 17,
//             },
//         ],
//     },
//     17: {
//         message: 'Confident, aye. I like it. But be careful, wildlife here can be dangerous.',
//         options: [
//             {
//                 response: 'Thanks.',
//                 next: 3,
//             },
//         ],
//     },
//     20: {
//         message: 'Aye, I need help with rats in the basement. Please get rid of them. I\'ll make it worth the time.',
//         options: [
//             {
//                 response: 'Rats? Should be easy.',
//                 next: 3,
//                 closeDialogue: true,
//                 specialResponse: { id: 2, type: 'quest', start: true },
//                 nextIfQuestStarted: 21,
//             },
//             { response: 'No thanks, I\'m not a basement dweller.', next: 3 },
//         ],
//     },
//     21: {
//         message: 'Not anymore. I\'m busy moving my merchandise back to the basement.',
//         options: [
//             {
//                 response: 'Okay, see you soon.',
//                 next: 3,
//             },
//         ],
//     },
// }
// export default LA_HARPAR_TRADER
