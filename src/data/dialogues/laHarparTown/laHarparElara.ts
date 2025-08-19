import { DialogueNode } from '../../../interfaces/dialogues/dialogue-node.interface'
import { QuestID } from '../../../enums/ids/quest-id.enum'

export enum ElaraDialogue {
    greeting = 0,
    apology = 1,
    fatherIntro = 3,
    captainInfo = 4,
    pirateInfo = 5,
    treasureInfo = 8,
    permitInfo = 9,
    richnessInfo = 10,
    hiddenJewelsInfo = 11,
    rumorSceptre = 15,
    primulaInfo = 16,
    fairytaleInfo = 17,
    fatherPersonality = 18,
    villagersOpinion = 30,
    marvinInfo = 31,
    marvinLocation = 32,
    villagesComment = 33
}

export type LaHarparElaraDialogueType = Record<ElaraDialogue, DialogueNode<ElaraDialogue>>

const LA_HARPAR_ELARA: LaHarparElaraDialogueType = {
    [ElaraDialogue.greeting]: {
        id: ElaraDialogue.greeting,
        messageKey: 'laHarparElara:greeting.message',
        options: [
            { responseKey: 'laHarparElara:greeting.opt1', next: ElaraDialogue.apology },
            { responseKey: 'laHarparElara:greeting.opt2', next: ElaraDialogue.apology },
            { responseKey: 'laHarparElara:greeting.opt3', next: ElaraDialogue.greeting, closeDialogue: true },
        ],
    },
    [ElaraDialogue.apology]: {
        id: ElaraDialogue.apology,
        messageKey: 'laHarparElara:apology.message',
        options: [
            { responseKey: 'laHarparElara:apology.opt1', next: ElaraDialogue.fatherIntro },
            { responseKey: 'laHarparElara:apology.opt2', next: ElaraDialogue.villagersOpinion },
        ],
    },
    [ElaraDialogue.fatherIntro]: {
        id: ElaraDialogue.fatherIntro,
        messageKey: 'laHarparElara:fatherIntro.message',
        options: [
            { responseKey: 'laHarparElara:fatherIntro.opt1', next: ElaraDialogue.captainInfo },
            { responseKey: 'laHarparElara:fatherIntro.opt2', next: ElaraDialogue.treasureInfo },
            { responseKey: 'laHarparElara:fatherIntro.opt3', next: ElaraDialogue.rumorSceptre },
        ],
    },
    [ElaraDialogue.captainInfo]: {
        id: ElaraDialogue.captainInfo,
        messageKey: 'laHarparElara:captainInfo.message',
        options: [
            { responseKey: 'laHarparElara:captainInfo.opt1', next: ElaraDialogue.pirateInfo },
            { responseKey: 'laHarparElara:captainInfo.opt2', next: ElaraDialogue.treasureInfo },
        ],
    },
    [ElaraDialogue.pirateInfo]: {
        id: ElaraDialogue.pirateInfo,
        messageKey: 'laHarparElara:pirateInfo.message',
        options: [
            {
                responseKey: 'laHarparElara:pirateInfo.opt1',
                next: ElaraDialogue.apology,
                closeDialogue: true,
                effects: { type: 'quest', action: 'start', questId: QuestID.aTaleOfACaptain },
            },
            { responseKey: 'laHarparElara:pirateInfo.opt2', next: ElaraDialogue.apology, closeDialogue: true },
        ],
    },
    [ElaraDialogue.treasureInfo]: {
        id: ElaraDialogue.treasureInfo,
        messageKey: 'laHarparElara:treasureInfo.message',
        options: [
            { responseKey: 'laHarparElara:treasureInfo.opt1', next: ElaraDialogue.permitInfo },
            { responseKey: 'laHarparElara:treasureInfo.opt2', next: ElaraDialogue.richnessInfo },
        ],
    },
    [ElaraDialogue.permitInfo]: {
        id: ElaraDialogue.permitInfo,
        messageKey: 'laHarparElara:permitInfo.message',
        options: [
            { responseKey: 'laHarparElara:permitInfo.opt1', next: ElaraDialogue.apology },
        ],
    },
    [ElaraDialogue.richnessInfo]: {
        id: ElaraDialogue.richnessInfo,
        messageKey: 'laHarparElara:richnessInfo.message',
        options: [
            { responseKey: 'laHarparElara:richnessInfo.opt1', next: ElaraDialogue.hiddenJewelsInfo },
        ],
    },
    [ElaraDialogue.hiddenJewelsInfo]: {
        id: ElaraDialogue.hiddenJewelsInfo,
        messageKey: 'laHarparElara:hiddenJewelsInfo.message',
        options: [
            { responseKey: 'laHarparElara:hiddenJewelsInfo.opt1', next: ElaraDialogue.apology },
        ],
    },
    [ElaraDialogue.rumorSceptre]: {
        id: ElaraDialogue.rumorSceptre,
        messageKey: 'laHarparElara:rumorSceptre.message',
        options: [
            { responseKey: 'laHarparElara:rumorSceptre.opt1', next: ElaraDialogue.primulaInfo },
        ],
    },
    [ElaraDialogue.primulaInfo]: {
        id: ElaraDialogue.primulaInfo,
        messageKey: 'laHarparElara:primulaInfo.message',
        options: [
            { responseKey: 'laHarparElara:primulaInfo.opt1', next: ElaraDialogue.fairytaleInfo },
            { responseKey: 'laHarparElara:primulaInfo.opt2', next: ElaraDialogue.fatherPersonality },
        ],
    },
    [ElaraDialogue.fairytaleInfo]: {
        id: ElaraDialogue.fairytaleInfo,
        messageKey: 'laHarparElara:fairytaleInfo.message',
        options: [
            { responseKey: 'laHarparElara:fairytaleInfo.opt1', next: ElaraDialogue.apology },
        ],
    },
    [ElaraDialogue.fatherPersonality]: {
        id: ElaraDialogue.fatherPersonality,
        messageKey: 'laHarparElara:fatherPersonality.message',
        options: [
            { responseKey: 'laHarparElara:fatherPersonality.opt1', next: ElaraDialogue.apology },
        ],
    },
    [ElaraDialogue.villagersOpinion]: {
        id: ElaraDialogue.villagersOpinion,
        messageKey: 'laHarparElara:villagersOpinion.message',
        options: [
            { responseKey: 'laHarparElara:villagersOpinion.opt1', next: ElaraDialogue.marvinInfo },
            { responseKey: 'laHarparElara:villagersOpinion.opt2', next: ElaraDialogue.villagesComment },
        ],
    },
    [ElaraDialogue.marvinInfo]: {
        id: ElaraDialogue.marvinInfo,
        messageKey: 'laHarparElara:marvinInfo.message',
        options: [
            { responseKey: 'laHarparElara:marvinInfo.opt1', next: ElaraDialogue.marvinLocation },
        ],
    },
    [ElaraDialogue.marvinLocation]: {
        id: ElaraDialogue.marvinLocation,
        messageKey: 'laHarparElara:marvinLocation.message',
        options: [
            { responseKey: 'laHarparElara:marvinLocation.opt1', next: ElaraDialogue.apology, closeDialogue: true },
        ],
    },
    [ElaraDialogue.villagesComment]: {
        id: ElaraDialogue.villagesComment,
        messageKey: 'laHarparElara:villagersComment.message',
        options: [
            { responseKey: 'laHarparElara:villagersComment.opt1', next: ElaraDialogue.apology },
        ],
    },
}

export default LA_HARPAR_ELARA
