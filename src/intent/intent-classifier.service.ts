import * as natural from 'natural';
class IntentClassifier {
  private classifier: natural.BayesClassifier;
  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.trainClassifier();
  }
  private trainClassifier() {
    this.classifier.addDocument('Hi', 'greeting');
    this.classifier.addDocument('bye', 'farewell');
    this.classifier.train();
  }
  public getIntent(message: string): string {
    const intent = this.classifier.classify(message);
    return intent;
  }
}
export default IntentClassifier;
