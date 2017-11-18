//* Higher Order Component (HOC) - A component (HOC) that renders another componets

// Reuse code
// Render HiJacking
// Props Manipulator
// Abstract State

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The key info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is Private Information. So, Please Don't Share.</p>}
            <WrappedComponent {...props}/>
        </div>
    )
};

const AuthenticatedRequired = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuth ? <p>Access Denied!</p> :
            <p>The key info is: {props.info}</p>}
        </div>
        
    );
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = AuthenticatedRequired(Info)
ReactDOM.render(<AuthInfo isAuth={true} info="Be Super Smart!" />, document.getElementById('app'));
//ReactDOM.render(<AdminInfo isAdmin={true} info="Be Super Smart!" />, document.getElementById('app'));