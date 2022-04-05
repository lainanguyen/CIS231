const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// The state starts with zero, so when it restarts it goes back to a clean state which is used in the function startGame
let state = {}

function startGame(){
    state = {}
    showTextNode(1);
}

// This function enables the text to show up on the screen, and removes the previous text as the user chooses a button option
function showTextNode(textNodeIndex){
 const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
 textElement.innerText = textNode.text
 while (optionButtonsElement.firstChild){
     optionButtonsElement.removeChild(optionButtonsElement.firstChild)
 }

//  This creates the effect of moving to the next page when the user clicks the button
 textNode.options.forEach(option => {
     if (showOption(option)){
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
     }
 })
}

function showOption(option){
    return option.requireState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

// This is the algorithm that makes up the script of the story. The options link to each other and are differientated by their id's
const textNodes = [
    {
      id: 1,
      text: 'Sally is a new girl at Eastern high. Help her go from being the new girl to prom queen!',
      options: [
        {
          text: 'Start',
          nextText: 2
        },
      ]
    },
    {
      id: 2,
      text: 'First impressions can make or break it! What should Sally wear on the first day of school?',
      options: [
        {
          text: 'Baggy t-shirt and sweatpants',
          nextText: 3
        },
        {
          text: 'Ball gown',
          nextText: 4
        },
        {
          text: 'Cute shirt and jeans',
          nextText: 5
        },
        {
          text: 'Start over',
          nextText: -1
        }
      ]
    },
    {
      id: 3,
      text: 'Sally showed up to school in a baggy t-shirt and sweatpants and was called the smelly girl for the rest of the year!',
      options: [
        {
          text: 'Start over',
          nextText: -1
        },
      ]
    },
    {
      id: 4,
      text: 'Sally showed up to school in a ball gown. Everyone looked at her funny when she walked in and she was called the weird girl for the rest of the year!',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 5,
      text: 'Sally showed up to school in a cute shirt and jeans. A group of girls complimented her outfit and invited her to sit with them at lunch!',
      options: [
        {
            text: 'Sit with them',
            nextText: 6
        },
        {
          text: 'Start over',
          nextText: -1
        }
      ]
    },
    {
      id: 6,
      text: "At lunch, a cute boy walks up to Sally and introduces himself. Unfortunately, it's Amanda's ex and Sally heard that she's the most popular and meanest girl at school. What should Sally do?",
      options: [
        {
          text: 'Ignore the boy',
          nextText: 7
        },
        {
          text: 'Flirt with the boy',
          nextText: 8
        },
        {
            text: 'Start over',
            nextText: -1
          }
      ]
    },
    {
      id: 7,
      text: 'Amanda sees that you ignored her ex and takes a liking to you! She invites you to her house after school',
      options: [
        {
          text: 'Say yes',
          nextText: 9
        },
        {
          text: 'Say no',
          nextText: 9
        },
        {
            text: 'Start over',
            nextText: -1
          }
      ]
    },
    {
      id: 8,
      text: "Amanda sees that you flirted with her ex and is furious! She comes up to you and threatens to make your life miserable. However, you are now with the cutest boy at school and you catch everyone's attention!",
      options: [
        {
          text: 'Next',
          nextText: 10
        },
        {
          text: 'Start over',
          nextText: -1
        }
      ]
    },
    {
      id: 9,
      text: 'Amanda makes you come to her house regardless of whether you said yes or no. Eventually you become her minion and live under her reign for the rest of high school, making your life miserable.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 10,
      text: 'Prom season is coming up soon. How will you choose to build your campaign?',
      options: [
        {
          text: 'Become friends with everyone to get their votes',
          nextText: 11
        },
        {
          text: 'Copy everything Amanda does',
          nextText: 12
        },
        {
            text: 'Start over',
            nextText: -1
          }
      ]
    },
    {
      id: 11,
      text: 'You are now friends with the majority of the school and everyone loves you and is rooting for you to become prom queen!',
      options: [
        {
          text: 'Next',
          nextText: 13
        },
        {
            text: 'Start over',
            nextText: -1
          }
      ]
    },
    {
        id: 12,
        text: 'You copied everything Amanda does and eventually you became the stuck up mean girl. Everyone secretly hates you and no one will vote for you as prom queen!',
        options: [
          {
              text: 'Start over',
              nextText: -1
            }
        ]
    },
      {
        id: 13,
        text: 'You are now shopping for your prom dress. Which one should you wear to prom?',
        options: [
          {
            text: 'A sparkly pink dress with rhinestones (Which Amanda is wearing as well)',
            nextText: 14
          },
          {
            text: 'A red halter neck dress with elegant pearls',
            nextText: 15
          },
          {
            text: 'A white sparkly one shoulder gown',
            nextText: 15
          }
        ]
    },
    {
        id: 14,
        text: 'You showed up to prom with the same dress as Amanda. Everyone is laughing at both of you and she gets furious and attacks you. Neither of you got prom queen and your prom night is ruined!',
        options: [
          {
              text: 'Start over',
              nextText: -1
            }
        ]
    },
    {
        id:15,
        text: 'You showed up to prom with a beautiful unique dress. All the eyes were on you and to end the night, you got prom queen!',
        options: [
            {
              text: 'Next',
              nextText: 16
            },
            {
                text: 'Start over',
                nextText: -1
              }
          ]
    },
    {
        id:16,
        text: 'Congratulations, you made all the right decisions that led to Sally being prom queen and she lived on to have a fabulous rest of high school.',
        options:[
            {
                text: 'Start over',
                nextText: -1
            }
        ]
    }
  ]

startGame() 