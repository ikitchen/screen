import { Store } from 'flummox';


export default class MessageStore extends Store {
  constructor(flux) {
    super();

    const screenActions = flux.getActions('screen');
    this.register(screenActions.loadConfig, this.handleLoadConfig);

    this.state = {
      config: {components:[]}
    };
  }

  handleLoadConfig(config) {
    this.setState({ config });
    console.log(this.state);
  }
}