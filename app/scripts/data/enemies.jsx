module.exports = {

    gayathan: {

        name: 'Gayathan', hp: 10000, maxHp: 10000, description: 'description', status: 'alive', defence: 0, attacks_1: [
            {
                name: "Make the Snake Dance", magnitude: 250, type: 'damaging', initialText: [
                "Gayathan joins her vestigial little arms together and begins to move in sinous pulses",
                "It becomes aparent that she is trying to recreate the snake dance from the youtube video",
                "Her new body is enormous though, and it is a poor impression.",
                "the "
            ]
            }, {
                name: "Talk about parenting Methods", magnitude: 100, type: 'damaging', initialText: [
                    "Gayathan picks " + activeActionTarget + " as the unlucky recepient of her parental advice",
                    "\"The best way to raise your child...\" she begins.",
                    "What follows is a series of the most salacious instructions that " + activeActionTarget + " has ever heard",
                    "The bad advice jades him about parenthood in general.",
                ]
            }, {
                name: "Cackle hellishly", magnitude: 100, type: 'damaging', initialText: [
                    "Usually Gayathan\'s laughter has the power to petrify a small child.",
                    "But since she has now been transformed into the earth\'s top carnivore," +
                    "Her laughter sounds like the wails of all humanity",
                    "She laughs directly at " + activeActionTarget,
                    activeActionTarget + " is so terrified that he looses some of his will to fight."
                ]
            }, {
                name: "Take over their window sill",
                magnitude: 100,
                type: 'damaging',
                initialText: [
                    "Gayathan wants to find a comfy place to rest her tired clawed feet",
                    "She find her favorite window sill by " + activeActionTarget + "\'s desk",
                    activeActionTarget + " worries that now, instead of enjoying the quite drama of Redwood City,",
                    "he will have to find pleasure in Gayathan\'s nightmare enducing Dinosaur transformation",
                    "The thought brings bile to the back of his throat"
                ]
            }
        ], attacks_2: [
            {
                name: "Insist that you watch bollywood videos", magnitude: 250, type: 'damaging', initialText: [
                "Now that she is one the deadliest predators that have ever roamed the earth,",
                "Gayathan has the confidence to force everyone to watch her favorite Bollywood flicks with her",
                "She demands that " + activeActionTarget + " bring her some popcorn or else she shall make him his snack",
                activeActionTarget + "spends his whole day popping inumerable packets of popcorn."
            ]
            }, {
                name: "Howl at the moon", magnitude: 100, type: 'damaging', initialText: [
                    "As the first member of the Moon Freaks Gayathan has special moon powers",
                    "Her new form only amplifies this power.",
                    "She produces a terrible howl that summons the moon into the day sky",
                    "The moon shoots a ray of vengeful energy directly at " + activeActionTarget

                ]
            }, {
                name: "Check herself out",
                magnitude: 100,
                type: 'damaging',
                initialText: [
                    "Gayathan takes a moment to catch her reflection in the mirror",
                    "She begins to check herself out, posing in different ways, each more ridiculous than the last",
                    activeActionTarget + "is particularly disturbed by ther disproportionate self-regard",
                    "The sight makes him loose some of his morale",
                ]
            }
        ], attacks_3: [
            {
                name: "Smell Attack", magnitude: 250, type: 'damaging', initialText: [
                "Gayathan raises her little arms up in the air",
                "a pungent cloud of body odor wafts directly at " + activeActionTarget,
                "Before he can think to do otherwise, he breaths in the lethal aroma"
            ]
            }, {
                name: "Word Attack", magnitude: 100, type: 'damaging', initialText: [
                    "Gayathan begins to talk to " + activeActionTarget + " an accelerated pace",
                    "She doesn't seem to be saying anything coherent",
                    activeActionTarget + " begins to loose his mind to the nonesense storm"
                ]
            }, {
                name: "Insist on her masala manana", magnitude: 100, type: 'damaging', initialText: [
                    "Gayathan wants " + activeActionTarget + "to try her masala manana",
                    activeActionTarget + " doesn\'t want to be rude, even if Gayathan is now a terrifying monster",
                    "He decides to take the smallest spec of food that would be considered polite",
                    "Upon hitting his tongue, the morsel burns his tongue to a crisp",
                    "It is spicy beyond any shadow of sanity"
                ]
            }, {
                name: "Harness the power of the sun",
                magnitude: 100,
                type: 'damaging',
                initialText: [
                    "Gayathan stands by the window, charging herself with Solar energy",
                    "She behins to glow with an unnatural yellow light",
                    "She looks directly at " + activeActionTarget + " and shoots a with hot plasma laser at him"
                ]
            }
        ]
    }
};