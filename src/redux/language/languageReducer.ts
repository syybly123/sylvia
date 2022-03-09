import i18n from 'i18next';
export interface LanguageState {
    language:"en" | "zh",
    languageList: {name: string, code: string}[]
}
const defaultState: LanguageState = {
    language: "en",
    languageList: [
        {name:"中文", code:"zh"},
        {name:"English", code:"en"}
    ]
    
}
export default (state = defaultState , action )=> {
    switch (action.type) {
        case "change_language":
            i18n.changeLanguage(action.payload);
            const newState = {...state, language: action.payload};
            return newState;

        case "add_language":
        const newState2 = {
            ...state, 
            languageList: [...state.languageList, action.payload],
         };
        return newState2;

        default: return state;

    }
    
    
    
}