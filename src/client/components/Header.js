import React, { Component } from 'react';

class Header extends Component {
  render() {
    const styles = {
      main: {
        textAlign: 'center',
        fontFamily: 'Source Sans Pro',
        fontSize: 50,
      },
    };
    return <h1 style={styles.main}>PowerChord Recipes</h1>;
  }
}

export default Header;
