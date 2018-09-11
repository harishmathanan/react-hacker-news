import * as React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { getAllStories } from '../../actions/storyActions';

import Config from '../../config';

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

    this.state = {
      isFetching: false,
      isError: false,
      isSuccess: false,
      message: '',
      data: {}
    };
  }

  public componentDidMount() {
    this.getAllStories();
  }

  public render() {
    return (
      <div>
        {this.state.isFetching &&
          <div className="columns">
            <div className="column col-12">
              <h5>Working on it...</h5>
            </div>
          </div>
        }

        {this.state.isError &&
          <div className="columns">
            <div className="column col-12">
              <h5>{this.props.message}</h5>
            </div>
          </div>
        }

        <div className="columns">
          <div className="columns col-12">
            {JSON.stringify(this.state.data)}
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
  private getAllStories = () => {

      fetch(`${Config.serverUrl}/v0/newstories.json`)
      .then((response: Response) => {
        if (!response.ok) {
          this.setState({ isFetching: false, isError: true, isSuccess: false, message: response.statusText });

        } else {
          // response data returns an array of numbers that represent the story ids.
          response.json().then((data: any) => {

            const storyLimit = data.slice(0, 15); // limit the items return to 15

            Promise
              .all(storyLimit.map((storyId: number) => {
                 // For each story id, fetch and retrieve story data
                 return fetch(`${Config.serverUrl}/v0/item/${storyId}.json`);
              }))
              .then((values: any) => {

                Promise
                  .all(values.map((value: any) => {
                    return value.json();
                  }))
                  .then((content: any) => {
                    this.setState({ isFetching: false, isError: false, isSuccess: true, data: content });
                  })
                  .catch((error: Error) => {
                    this.setState({ isFetching: false, isError: true, isSuccess: false, message: error.message});
                  });

              })
              .catch((error: Error) => {
                this.setState({ isFetching: false, isError: true, isSuccess: false, message: error.message});
              });
          });
        }
      })
      .catch((error: Error) => {
        this.setState({ isFetching: false, isError: true, isSuccess: false, message: error.message});
      });
  };
}

/*
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
*/

export default Stories;
