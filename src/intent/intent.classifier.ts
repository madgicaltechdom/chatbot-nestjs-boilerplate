import * as natural from 'natural';

class IntentClassifier {
  private classifier: natural.BayesClassifier;
  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.trainClassifier();
  }
  private trainClassifier() {
    this.classifier.addDocument('Hi', 'greeting');
    this.classifier.addDocument('sendbutton', 'button');
    this.classifier.addDocument('button_response', 'button_response');
    this.classifier.addDocument('persistent_menu_response', 'Topnews');
    this.classifier.train();
  }
  public getIntent(message: string): string {
    const intent = this.classifier.classify(message);
    return intent;
  }
}
export default IntentClassifier;
