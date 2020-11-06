export function getNRandomItems(items, n) {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

export const demographicsIds = 
    ["gender", "age", "income", "politics", "education", "gig"];

export const demographics = [
    {id: "personalData", questions: [
        {id: "gender", text: "What is your gender?", options: ["Female", "Male", "Non-binary", "Other", "Prefer not to respond"]},
        {id: "age", text: "How old are you?", options: ["Less than 18 years old", "18-24 years old", "25-34 years old", "35-44 years old", "45-54 years old", "55-64 years old", "More than 64 years old", "Prefer not to respond"]},
        {id: "income", text: "What is your (household) income level?", options: ["Less than $20,000", "$20,000-$39,999", "$40,000-$59,999", "$60,000-$79,999", "$80,000-$99,999", "$100,000-$150,000", "More than $150,000", "Prefer not to respond"]},
        {id: "politics", text: "How would you describe your political views?", options: ["Liberal", "Somewhat liberal", "Moderate", "Somewhat conservative", "Conservative", "Prefer not to respond"]},
        {id: "education", text: "What is the highest level of education you have completed?", options: ["High school or lower", "Some college", "Associate degree or lower", "Bachelor's degree or lower", "Graduate degree", "Prefer not to respond"]},
        {id: "race", text: "How would you describe yourself in terms of race?", options: ["African American", "Asian", "Caucasian", "Hispanic", "Other", "Prefer not to respond"]}
    ]},
    {id: "experience", questions: [
        {id: "gig", text: "Add more questions?", options: ["Add options", "Prefer not to respond"]},
    ]},
];

export const config = {
    apiKey: "AIzaSyBRZMYFURGX03kA3YpiTBmwc1Fi5pdvFpM",
    authDomain: "gigeco-project.firebaseapp.com",
    databaseURL: "https://gigeco-project.firebaseio.com",
    projectId: "gigeco-project",
    storageBucket: "gigeco-project.appspot.com",
    messagingSenderId: "975703800780",
    appId: "1:975703800780:web:4a55530d3e349fcfa07b69"
  };