import * as React from "react";
import {connect, MapStateToProps} from "react-redux";
import {load as loadAction} from "./actions";
import {Status} from "./constants";

interface StartLoadingFunc {
    // args - all rest props except of loader props
    (...args: any[]):Promise<any>,
}

interface Props {
    label:string;
    status:string;
    statusMessage:string;
    startLoading:StartLoadingFunc;
}

const mapStateToProps:MapStateToProps = ({loader, ownProps}) => ({
    ...loader, ...ownProps
});

const mapDispatchToPropsWrapper = (loadFn)=>(dispatch, ownProps:object):MapStateToProps=>({
    startLoading() {
        dispatch(loadAction(loadFn(ownProps)))
    }
});

const ownLoaderPropsMap = {"label": true, "status":true, "statusMessage":true, "startLoading":true};
const omitLoaderProps = (props)=>{
    return Object.keys(props).reduce((memo, propName)=>{
        if(!ownLoaderPropsMap[propName]) {
           memo[propName] = props[propName];
        }
        return memo;
    }, {})
};

export const loader = (loadFn:StartLoadingFunc) => Component => {

    class Loader extends React.Component<Props, any> {

        componentWillMount() {
            const {startLoading} = this.props;
            startLoading(omitLoaderProps(this.props));
        }

        render() {
            const {label = '...', status, statusMessage, ...restProps} = this.props;
            const isLoading = status === Status.PROGRESS;
            const isCompleted = [Status.SUCCESS, Status.WARNING, Status.ERROR].some(compStatus => compStatus === status);
            const isLoadedSuccessfully = isCompleted && status === Status.SUCCESS;
            if (isLoading) {
                return <div className='loader-container'>
                    {label && <h3>{label}</h3>}
                    {statusMessage && <p>{statusMessage}</p>}
                    <i className='fa fa-spinner text-primary' style={{fontSize: "48px"}}/>
                </div>
            } else if (isCompleted && isLoadedSuccessfully) {
                return <Component {...restProps}/>
            }
            return <p className="text-danger">
                <h3>{statusMessage}</h3>
            </p>;
        }

    }

    return connect(mapStateToProps, mapDispatchToPropsWrapper(loadFn))(Loader)

};


