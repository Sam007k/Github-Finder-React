import { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../Repos/Repos";
import GithubContext from "../../context/github/GithubContext";

export const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, getUserRepos, repos, user, loading } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    company,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
        Hireable: {""}
        {hireable ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times-circle text-danger"></i>
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} alt="" style={{ width: "150px" }} />
            <h1>{name}</h1>
            {location && <p>Location: {location}</p>}
          </div>
          <div>
            {bio && (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            )}

            <a href={html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <>
                    <strong>Username: {login}</strong>
                  </>
                )}
              </li>
              <li>
                {login && (
                  <>
                    <strong>Company: {company}</strong>
                  </>
                )}
              </li>
              <li>
                {login && (
                  <>
                    <strong>Website: {blog}</strong>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-danger">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </>
    );
  }
};

export default User;
