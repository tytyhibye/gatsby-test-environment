import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startHelper() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button")
      button.innerText = option.text
      button.classList.add("btn")
      button.addEventListener("click", () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startHelper()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "Let's get started, select what best applies to you.",
    options: [
      {
        text: "I'm starting a business",
        setState: { startingBiz: true },
        nextText: 2,
      },
      {
        text: "I already own a business",
        nextText: 2,
      },
      {
        text: "I'm going into business with someone",
        setState: { startingBiz: true, partner: true },
        nextText: 2,
      },
      {
        text: "I'm a content/product creator",
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    text:
      "A new business can be quite an exciting adventure! Here are some things you may need to help you get started!",
    options: [
      {
        text: "LLC",
        requiredState: currentState => currentState.startingBiz,
        setState: { llc: true },
        nextText: 4,
      },
      {
        text: "Partnership",
        requiredState: currentState => currentState.partner,
        setState: { partnership: true },
        nextText: 4,
      },
      {
        text: "Intellectual Property",
        setState: { copyright: true, trademark: true, patent: true },
        nextText: 4,
      },
    ],
  },
  {
    id: 3,
    text:
      "I applaud your creativity! Here's some options in protecting what you've created.",
    options: [
      {
        text: "Copyrights",
        setState: { copyright: true },
        nextText: 4,
      },
      {
        text: "Trademarks",
        setState: { trademark: true },
        nextText: 4,
      },
      {
        text: "Patents",
        setState: { patent: true },
        nextText: 4,
      },
    ],
  },
  {
    id: 4,
    text: "Here's the contact you will need to get started on your adventure!",
    options: [
      {
        text: "Copyright Contract",
        requiredState: currentState => currentState.copyright,
        nextText: -1,
      },
      {
        text: "Trademark Contract",
        requiredState: currentState => currentState.trademark,
        nextText: -1,
      },
      {
        text: "Patent Contract",
        requiredState: currentState => currentState.patent,
        nextText: -1,
      },
      {
        text: "LLC Contract",
        requiredState: currentState => currentState.llc,
        nextText: -1,
      },
      {
        text: "Partnership Contract",
        requiredState: currentState => currentState.partner,
        nextText: -1,
      },
    ],
  },
]

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <div class="container">
      <div id="text">text</div>
      <div id="option-buttons" class="btn-grid">
        <button class="btn">Option 1</button>
        <button class="btn">Option 2</button>
        <button class="btn">Option 3</button>
        <button class="btn">Option 4</button>
      </div>
    </div>
    <Link to="/">Start Over</Link>
  </Layout>
)

startHelper()

export default SecondPage
