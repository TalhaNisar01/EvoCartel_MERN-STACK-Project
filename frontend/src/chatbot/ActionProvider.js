class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet() {
      const greetingMessage = this.createChatBotMessage('Hi, friend. How can I assist you today?');
      this.updateChatbotState(greetingMessage);
    }
  
    handleServices() {
      const servicesMessage = this.createChatBotMessage(
        'We offer a variety of services including:\n1. Product Sales\n2. Customer Support\n3. Order Tracking\n4. More information can be found on our services page.'
      );
      this.updateChatbotState(servicesMessage);
    }
  
    handleRefrigerator() {
      const refrigeratorMessage = this.createChatBotMessage(
        'You can find our refrigerator collections here: http://localhost:3000/product/66a0c4323cc583586c79e44e'
      );
      this.updateChatbotState(refrigeratorMessage);
    }
  
    handleMobile() {
      const mobileMessage = this.createChatBotMessage(
        'You can find our mobile collections here: http://localhost:3000/product/66a0986e8e658cdc60c2ab7f'
      );
      this.updateChatbotState(mobileMessage);
    }
  
    handleUnknown() {
      const unknownMessage = this.createChatBotMessage(
        "I'm sorry, I didn't understand that. Can you please rephrase or ask about something else?"
      );
      this.updateChatbotState(unknownMessage);
    }
  
    updateChatbotState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  