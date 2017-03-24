import React from 'react'

import Layout from './Layout'

export default class extends React.Component {
  state = { name: '', amount: '' };

  onChangeName = (event) => {
    this.setState({ name: event.target.value })
  };

  onChangeAmount = (event) => {
    this.setState({ amount: event.target.value })
  };

  render () {
    const { name, amount } = this.state
    const text = `@${name} #iou $${amount}`
    return (
      <Layout>
        <section>
          <form action="https://twitter.com/intent/tweet">
            <input name="text" value={text} type="hidden" />
            <fieldset>
              <legend>Owe someone</legend>
              <div className="form-group">
                <label for="owee">Twitter screen name</label>
                <div className="input-group">
                  <span className="input-group-addon">@</span>
                  <input
                    id="owee"
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={this.onChangeName}
                    autoFocus
                  />
                </div>
              </div>
              <div className="form-group">
                <label for="amount">Amount</label>
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input
                    id="amount"
                    className="form-control"
                    type="number"
                    value={amount}
                    onChange={this.onChangeAmount}
                  />
                </div>
              </div>
              <button className="btn btn-default" type="submit">Tweet It</button>
            </fieldset>
          </form>
        </section>
      </Layout>
    )
  }
}
