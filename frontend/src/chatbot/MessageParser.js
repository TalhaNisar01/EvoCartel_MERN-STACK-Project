class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes('hello')) {
        this.actionProvider.greet();
      } else if (lowerCaseMessage.includes('services')) {
        this.actionProvider.handleServices();
      } else if (lowerCaseMessage.includes('refrigerator')) {
        this.actionProvider.handleRefrigerator();
      } else if (lowerCaseMessage.includes('mobile')) {
        this.actionProvider.handleMobile();
      } else {
        this.actionProvider.handleUnknown();
      }
    }
  }
  
  export default MessageParser;
  