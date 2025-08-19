import { DialogueOption } from './dialogue-option.type'

export interface DialogueNode<T> {
    id: T
    messageKey: string // i18n key
    options: DialogueOption<T>[]
}
