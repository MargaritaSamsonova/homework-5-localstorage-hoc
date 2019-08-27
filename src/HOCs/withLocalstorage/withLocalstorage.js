import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (...args) => (WrappedComponent) => {
    return class extends Component {

        render () {
            const savedData = () => {
                const loadedData = load(args[0]);
                return loadedData ? loadedData : [];
            }

            const saveData = (data = args[1]) => {
                save(args[0], data);
            }

            return (<WrappedComponent {...this.props} savedData={savedData} saveData={saveData}/>)
        }

    }

};

export default withLocalstorage;
