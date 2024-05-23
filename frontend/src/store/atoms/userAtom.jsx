
 import { atom , selector } from "recoil";

 
export const firstNameAtom = atom({
    key: "firstNameAtom",
    default: ""
})

export const lastNameAtom = atom({
    key: "lastNameAtom",
    default: ""
})

export const mobileNumberAtom = atom({
    key: "mobileNumberAtom",
    default: ""
})

export const passwordAtom = atom({
    key: "passwordAtom",
    default: ""
})

export const otpAtom = atom({
    key: "otpAtom",
    default: ""
})

export const loggedInAtom = atom({
    key: "loggedInAtom",
    default: false
})


export const eventsAtom = atom({
    key: "eventsAtom",
    default: []
})

export const singleEventAtom = atom({
    key: "singleEvent",
    default: {}
})


