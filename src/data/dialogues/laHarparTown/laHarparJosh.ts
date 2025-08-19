import { DialogueNode } from '../../../interfaces/dialogues/dialogue-node.interface'
import { QuestID } from '../../../enums/ids/quest-id.enum'

export enum JoshDialogue {
    greeting,
    payBeer,
    talkReady,
    intro,
    placeInfo,
    workInfo,
    warning,
    beachName,
    tradeInfo,
    regionsInfo,
    unknownRegions,
    dangerMountain,
    mountainRumors,
    missionCheck,
}

export type LaHarparJoshDialogueType = Record<JoshDialogue, DialogueNode<JoshDialogue>>

const LA_HARPAR_JOSH: LaHarparJoshDialogueType = {
    [JoshDialogue.greeting]: {
        id: JoshDialogue.greeting,
        messageKey: 'laHarparJosh:greeting.message',
        options: [
            { responseKey: 'laHarparJosh:greeting.opt1', next: JoshDialogue.payBeer },
            { responseKey: 'laHarparJosh:greeting.opt2', next: JoshDialogue.greeting, closeDialogue: true },
        ],
    },
    [JoshDialogue.payBeer]: {
        id: JoshDialogue.payBeer,
        messageKey: 'laHarparJosh:payBeer.message',
        options: [
            {
                responseKey: 'laHarparJosh:payBeer.opt1',
                next: JoshDialogue.talkReady,
                effects: { type: 'stat', stats: [{ amount: 20, key: 'goldCoins' }] },
            },
            { responseKey: 'laHarparJosh:payBeer.opt2', next: JoshDialogue.greeting, closeDialogue: true },
        ],
    },
    [JoshDialogue.talkReady]: {
        id: JoshDialogue.talkReady,
        messageKey: 'laHarparJosh:talkReady.message',
        options: [
            {
                responseKey: 'laHarparJosh:talkReady.opt1',
                next: JoshDialogue.talkReady,
                conditions: [{ type: 'questStep', questId: QuestID.clearingOutTheBeach, step: 1 }],
                effects: { type: 'quest', questId: QuestID.clearingOutTheBeach, action: 'end' },
            },
            { responseKey: 'laHarparJosh:talkReady.opt2', next: JoshDialogue.intro },
            { responseKey: 'laHarparJosh:talkReady.opt3', next: JoshDialogue.placeInfo },
            { responseKey: 'laHarparJosh:talkReady.opt4', next: JoshDialogue.workInfo },
            { responseKey: 'laHarparJosh:talkReady.opt5', next: JoshDialogue.talkReady, closeDialogue: true },
        ],
    },
    [JoshDialogue.intro]: {
        id: JoshDialogue.intro,
        messageKey: 'laHarparJosh:intro.message',
        options: [
            { responseKey: 'laHarparJosh:intro.opt1', next: JoshDialogue.warning },
            { responseKey: 'laHarparJosh:intro.opt2', next: JoshDialogue.talkReady },
        ],
    },
    [JoshDialogue.placeInfo]: {
        id: JoshDialogue.placeInfo,
        messageKey: 'laHarparJosh:placeInfo.message',
        options: [
            { responseKey: 'laHarparJosh:placeInfo.opt1', next: JoshDialogue.beachName },
            { responseKey: 'laHarparJosh:placeInfo.opt2', next: JoshDialogue.talkReady },
        ],
    },
    [JoshDialogue.workInfo]: {
        id: JoshDialogue.workInfo,
        messageKey: 'laHarparJosh:workInfo.message',
        options: [
            {
                responseKey: 'laHarparJosh:workInfo.opt1',
                next: JoshDialogue.talkReady,
                effects: { type: 'quest', questId: 1, action: 'start' },
            },
        ],
    },
    [JoshDialogue.warning]: {
        id: JoshDialogue.warning,
        messageKey: 'laHarparJosh:warning.message',
        options: [
            { responseKey: 'laHarparJosh:warning.opt1', next: JoshDialogue.talkReady },
            { responseKey: 'laHarparJosh:warning.opt2', next: JoshDialogue.talkReady, closeDialogue: true },
        ],
    },
    [JoshDialogue.beachName]: {
        id: JoshDialogue.beachName,
        messageKey: 'laHarparJosh:beachName.message',
        options: [
            { responseKey: 'laHarparJosh:beachName.opt1', next: JoshDialogue.tradeInfo },
            { responseKey: 'laHarparJosh:beachName.opt2', next: JoshDialogue.regionsInfo },
        ],
    },
    [JoshDialogue.tradeInfo]: {
        id: JoshDialogue.tradeInfo,
        messageKey: 'laHarparJosh:tradeInfo.message',
        options: [
            { responseKey: 'laHarparJosh:tradeInfo.opt1', next: JoshDialogue.talkReady },
        ],
    },
    [JoshDialogue.regionsInfo]: {
        id: JoshDialogue.regionsInfo,
        messageKey: 'laHarparJosh:regionsInfo.message',
        options: [
            { responseKey: 'laHarparJosh:regionsInfo.opt1', next: JoshDialogue.unknownRegions },
        ],
    },
    [JoshDialogue.unknownRegions]: {
        id: JoshDialogue.unknownRegions,
        messageKey: 'laHarparJosh:unknownRegions.message',
        options: [
            { responseKey: 'laHarparJosh:unknownRegions.opt1', next: JoshDialogue.dangerMountain },
        ],
    },
    [JoshDialogue.dangerMountain]: {
        id: JoshDialogue.dangerMountain,
        messageKey: 'laHarparJosh:dangerMountain.message',
        options: [
            { responseKey: 'laHarparJosh:dangerMountain.opt1', next: JoshDialogue.mountainRumors },
        ],
    },
    [JoshDialogue.mountainRumors]: {
        id: JoshDialogue.mountainRumors,
        messageKey: 'laHarparJosh:mountain_rumors.message',
        options: [
            { responseKey: 'laHarparJosh:mountainRumors.opt1', next: JoshDialogue.talkReady },
        ],
    },
    [JoshDialogue.missionCheck]: {
        id: JoshDialogue.missionCheck,
        messageKey: 'laHarparJosh:missionCheck.message',
        options: [
            { responseKey: 'laHarparJosh:missionCheck.opt1', next: JoshDialogue.talkReady },
        ],
    },
}

export default LA_HARPAR_JOSH
