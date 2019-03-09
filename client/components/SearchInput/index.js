export default class SeachInput extends React.Component {
  state = {
    input: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    this.props.onChange(value);
  };

  render() {
    return (
      <input
        type="text"
        name="input"
        className="block w-full h-full p-4 outline-none"
        placeholder="Search..."
        onChange={this.handleChange}
        value={this.state.input}
      />
    );
  }
}
