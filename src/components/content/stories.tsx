import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllStories } from '../../actions/storyActions';

export interface IStoriesProps {
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
  data: any;
  getData: any
}

class Stories extends React.Component<IStoriesProps, any> {
  constructor(props: IStoriesProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getData();
  }

  public render() {
    return (
      <div>
        {this.props.isFetching &&
          <div className="columns">
            <div className="column col-12">
              <h5>Working on it...</h5>
            </div>
          </div>
        }

        {this.props.isError &&
          <div className="columns">
            <div className="column col-12">
              <h5>{this.props.message}</h5>
            </div>
          </div>
        }

        <div className="columns">
          <div className="columns col-12">
            {JSON.stringify(this.props.data)}
          </div>
        </div>
      </div>
    );
  };

  /**
   * 1) Get all hacker news stories
   * 2) Wait for promise to resolve
   * 3) Limit the news stories to 15 items
   * 4) Get story content for each news story item
   * 5) Wait for all promises to resolve
   * 6) Convert the response to valid json data
   * 7) Wait for all promises to resolve
   */
}


const mapStateToProps = (state: any) => {
  return {
    isFetching: state.stories.isFetching,
    isError: state.stories.isError,
    isSuccess: state.stories.isSuccess,
    message: state.stories.isMessage,
    data: state.stories.stories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: bindActionCreators(getAllStories, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Stories);
