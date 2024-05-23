import { atom, selector } from "recoil";

export const createEventStepAtom = atom({
    key: "createEventStepAtom",
    default: 1
})

export const coverImageAtom = atom({
    key: 'coverImage',
    default: null, // Initially, there's no cover image selected
});


export const profileImageAtom = atom({
    key: 'profileImage',
    default: null, // Initially, there's no profile image selected
});

export const profileImageUrlAtom = atom({
    key: 'profileImageUrl',
    default: null, // Initially, there's no profile image selected
});


export const coverImageUrlAtom = atom({
    key: 'coverImageUrl',
    default: null, // Initially, there's no cover image selected
});



export const eventDetailsAtom = atom({
    key:'eventDetails',
    default: {
        eventName : "",
        collegeName : "",
        ticketPrice : null ,
        avatar : "",
        coverImage : "",
        eventType : "cultural",
        eventDescription  : "",
        eventDate : "",
        venue : "",
        phoneNumber1 : "",
        phoneNumber2 : "",
        duration : "",
        startTime : "",
        eventTermsAndCondition : ""
        
    }
})

export const eventAtom = atom({
    key:'event',
    default: {}
})
