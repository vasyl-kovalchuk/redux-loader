import * as React from "react";
import {ActionCreator, connect, Dispatch} from "react-redux";
import {Status} from "./constants";
import {completeLoadingAction, startLoadingAction} from "./actions";
import {ILoaderAction, StateStore} from "./types";

interface LoadingFunc {
    // args - all rest props except of loader props
    (ownProps:object, dispatch):Promise<any>,
}

interface Props {
    label?:string;
    status?:Status;
    statusMessage?:string;
    loading():Promise<any>;
}

const mapStateToProps = ({loader}:StateStore, ownProps) => ({
    ...loader, ...ownProps
});

const mapDispatchToPropsWrapper = (loadFn:LoadingFunc)=>(dispatch: Dispatch<ActionCreator<ILoaderAction>>, ownProps:object)=>({
    loading() {
        dispatch(startLoadingAction());
        return loadFn(ownProps, dispatch).then((result) => {
            dispatch(completeLoadingAction({
                status: Status.SUCCESS
            }));
            // propagate result to make a chain of promises
            return result;
        }, (e) => {
            dispatch(completeLoadingAction({
                status: Status.ERROR,
                statusMessage: e.message
            }))
        })
    }
});

const ownLoaderPropsMap = {"label": true, "status": true, "statusMessage": true, "loading": true};
const omitLoaderProps = (props)=>{
    return Object.keys(props).reduce((memo, propName)=>{
        if(!ownLoaderPropsMap[propName]) {
           memo[propName] = props[propName];
        }
        return memo;
    }, {})
};

export const loader = (loadFn:LoadingFunc) => Component => {

    class Loader extends React.Component<Props, any> {

        componentWillMount() {
            const {loading} = this.props;
            loading(omitLoaderProps(this.props));
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

    return connect(
        mapStateToProps,
        mapDispatchToPropsWrapper(loadFn)
    )(Loader)

};


