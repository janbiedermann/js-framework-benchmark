"use strict";

const React = require("nervjs");
const { render, createElement, Component } = React;
const { Store } = require("./Store");

const GlyphIcon = <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>;

class Row extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onSelect() {
    this.props.select(this.props.item.id);
  }

  onRemove() {
    this.props.remove(this.props.item.id);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item || nextProps.selected !== this.props.selected;
  }

  render() {
    let { selected, item } = this.props;
    return (<tr className={selected ? "danger" : ""}>
      <td className="col-md-1">{item.id}</td>
      <td className="col-md-4"><a onClick={this.onSelect}>{item.label}</a></td>
      <td className="col-md-1"><a onClick={this.onRemove}>{GlyphIcon}</a></td>
      <td className="col-md-6"></td>
    </tr>);
  }
}

// function Row({ data, id, onSelect, onDelete, styleClass }) {
//   return (
//     <tr className={styleClass}>
//       <td className="col-md-1">{id + ""}</td>
//       <td className="col-md-4">
//         <a onClick={selectOnClick(onSelect, id)}>{data.label}</a>
//       </td>
//       <td className="col-md-1">
//         <a onClick={deleteOnClick(onDelete, id)}>{span}</a>
//       </td>
//       {td}
//     </tr>
//   );
// }

function Jumbotron(run, runLots, add, update, clear, swapRows) {
  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-6">
          <h1>nervjs</h1>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="run"
                onClick={run}
              >
                Create 1,000 rows
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="runlots"
                onClick={runLots}
              >
                Create 10,000 rows
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="add"
                onClick={add}
              >
                Append 1,000 rows
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="update"
                onClick={update}
              >
                Update every 10th row
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="clear"
                onClick={clear}
              >
                Clear
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="swaprows"
                onClick={swapRows}
              >
                Swap Rows
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let header;

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { store: new Store() };
    this.select = this.select.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.run = this.run.bind(this);
    this.update = this.update.bind(this);
    this.runLots = this.runLots.bind(this);
    this.clear = this.clear.bind(this);
    this.swapRows = this.swapRows.bind(this);
    header = Jumbotron(
      this.run,
      this.runLots,
      this.add,
      this.update,
      this.clear,
      this.swapRows
    );
    this.start = 0;
    this.length = 0;

    window.app = this;
  }

  run() {
    this.state.store.run();
    this.setState({ store: this.state.store });
  }
  add() {
    this.state.store.add();
    this.setState({ store: this.state.store });
  }
  update() {
    this.state.store.update();
    this.setState({ store: this.state.store });
  }
  select(id) {
    this.state.store.select(id);
    this.setState({ store: this.state.store });
  }
  delete(id) {
    this.state.store.delete(id);
    this.setState({ store: this.state.store });
  }
  runLots() {
    this.state.store.runLots();
    this.setState({ store: this.state.store });
  }
  clear() {
    this.state.store.clear();
    this.setState({ store: this.state.store });
  }
  swapRows() {
    this.state.store.swapRows();
    this.setState({ store: this.state.store });
  }
  render() {
    return (
      <div className="container">
        {header}
        <table className="table table-hover table-striped test-data"><tbody>
          {this.state.store.data.map((item, i) => (
              <Row item={item} selected={this.state.store.selected === item.id} select={this.select} remove={this.delete}></Row>
          ))}
        </tbody></table>
        <span
          className="preloadicon glyphicon glyphicon-remove"
          aria-hidden="true"
        />
      </div>
    );
  }
}

render(<Main />, document.getElementById("main"));
