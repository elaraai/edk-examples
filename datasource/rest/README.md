# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to integrate with [GitHub](https://docs.github.com/en/rest).

# Usage

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating an application containing a rest datasource.

## Adding datasource
The rest datasource can be created with the following command ```edk add datasource rest --name Rest --def_dir src/datasource```. This will create an empty rest datasource:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.RestApiSourceSchema({
    name: "Rest"
})
```

### Adding authentication
The Github rest api uses OAuth2.0 authentication, using a [github app](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app) we will configure the datasource to manage this as a scalable solution:

```typescript
import * as ELARA from "@elaraai/edk/lib"

const rest_authorise_response_body_type = ELARA.StructType({
    code: 'string',
});
const rest_token_response_body_type = ELARA.StructType({
    access_token: 'string',
    token_type: 'string',
    scope: 'string',
});

export default ELARA.RestApiSourceSchema({
    name: "Rest",
    authorisation: {
        success_uri: ELARA.Const("https://www.github.com"),
        authorise_request: {
            url: ELARA.Const("https://github.com/login/oauth/authorize"),
            method: 'GET',
            accept: 'application/json',
            body: ELARA.Struct({
                client_id: ELARA.Environment("GITHUB_CLIENT_ID"),
                redirect_uri: ELARA.Variable("redirect_uri", 'string'),
                scope: ELARA.Const("repo"),
            }),
            content: 'application/x-www-form-urlencoded',
        },
        authorise_response: {
            status_code_variable: ELARA.Variable("status_code", 'integer'),
            status_text_variable: ELARA.Variable("status_text", 'string'),
            body: ELARA.Parse(ELARA.Variable("body", rest_authorise_response_body_type)),
            body_variable: ELARA.Variable("body", rest_authorise_response_body_type),
            value: ELARA.Parse(ELARA.Variable("body", rest_authorise_response_body_type)),
        },
        redirect_variable: ELARA.Variable("redirect_uri", 'string'),
        authorise_variable: ELARA.Variable("authorise", rest_authorise_response_body_type),
        token_request: {
            url: ELARA.Const("https://github.com/login/oauth/access_token"),
            method: 'POST',
            accept: 'application/json',
            body: ELARA.Struct({
                client_id: ELARA.Environment("GITHUB_CLIENT_ID"),
                client_secret: ELARA.Environment("GITHUB_CLIENT_SECRET"),
                code: ELARA.GetField(ELARA.Variable("authorise", rest_authorise_response_body_type), "code"),
                redirect_uri: ELARA.Variable("redirect_uri", 'string'),
            }),
            content: 'application/x-www-form-urlencoded',
        },
        token_response: {
            status_code_variable: ELARA.Variable("status_code", 'integer'),
            status_text_variable: ELARA.Variable("status_text", 'string'),
            body: ELARA.Parse(ELARA.Variable("body", rest_token_response_body_type)),
            body_variable: ELARA.Variable("body", rest_token_response_body_type),
            value: ELARA.Parse(ELARA.Variable("body", rest_token_response_body_type)),
        },
        token_variable: ELARA.Variable("token", rest_token_response_body_type),
    },
})
```
Now the the authentication is defined, app setup has been completed and the appropriate environment variable values for ```GITHUB_CLIENT_ID``` and ```GITHUB_CLIENT_SECRET``` have been set, we can define some queries.

### Adding request
We will first add a query to retreive the repos associated with a partiular github user (as defined within the ```GITHUB_USER``` environment variable). We can do this by adding a request to an endpoint to query, which uses the `access_token` field in the authorisation `token`:


```typescript
import * as ELARA from "@elaraai/edk/lib"

//...

export default ELARA.RestApiSourceSchema({
    name: "Rest",
    authorisation: {
        // ...
    },
    endpoints: {
        Repos: {
            rows_request: {
                url: ELARA.StringJoin`https://api.github.com/users/${ELARA.Environment("GITHUB_USER")}/repos`,
                method: 'GET',
                accept: 'application/json',
                headers: ELARA.Struct({
                    Accept: ELARA.Const("application/vnd.github.v3+json"),
                    Authorization: ELARA.StringJoin`token ${ELARA.GetField(ELARA.Variable("token", rest_token_response_body_type), "access_token")}`
                }),
                content: 'application/json',
            },
        }
    }
})
```

### Detecting response
Now that we have a query we can use the edk detection to infer the authenticated request response, with the following command `edk-io detect rest --asset rest.source --defaults`. This will specify a temporary callback url, as well as a temporary app authorisation url to click on to generate an access token, to detect the `Repos` endpoitn response:

```bash
ℹ Datasource Rest register callback: http://localhost:8080/auth/callback/rest.source
ℹ Datasource Rest use authorisation url: https://github.com/login/oauth/authorize?client_id=XXX&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcallback%2Frest.source&scope=repo
ℹ Detected expression body in endpoint Repos for Rest
┌─────────┬──────────┬────────────────────────────────────┬───────────────┬────────────────────────────┬─────────┐
│ (index) │    id    │              node_id               │     name      │         full_name          │ private │
├─────────┼──────────┼────────────────────────────────────┼───────────────┼────────────────────────────┼─────────┤
│   ...   │   ...    │                ...                 │      ...      │            ...             │   ...   │
└─────────┴──────────┴────────────────────────────────────┴───────────────┴────────────────────────────┴─────────┘
✔ detect datasource succeeded
```

Following the success of the detection we now have a detected response header and body:

```typescript
import * as ELARA from "@elaraai/edk/lib"

//...

const rest_repos_response_headers_type = ELARA.StructType({
    'x-ratelimit-limit': 'float',
    'x-ratelimit-remaining': 'float',
    'x-ratelimit-reset': 'float',
    'x-ratelimit-resource': 'string',
    'x-ratelimit-used': 'float',
    'x-xss-protection': 'float',
});

const rest_repos_response_body_type = ELARA.ArrayType(ELARA.StructType({
    id: 'float',
    node_id: 'string',
    name: 'string',
    full_name: 'string',
    'private': 'boolean',
    owner: ELARA.StructType({
        login: 'string',
        id: 'float',
        node_id: 'string',
        avatar_url: 'string',
        gravatar_id: 'string',
        url: 'string',
        html_url: 'string',
        followers_url: 'string',
        following_url: 'string',
        gists_url: 'string',
        starred_url: 'string',
        subscriptions_url: 'string',
        organizations_url: 'string',
        repos_url: 'string',
        events_url: 'string',
        received_events_url: 'string',
        type: 'string',
        site_admin: 'boolean',
    }),
    html_url: 'string',
    description: 'string',
    fork: 'boolean',
    url: 'string',
    forks_url: 'string',
    keys_url: 'string',
    collaborators_url: 'string',
    teams_url: 'string',
    hooks_url: 'string',
    issue_events_url: 'string',
    events_url: 'string',
    assignees_url: 'string',
    branches_url: 'string',
    tags_url: 'string',
    blobs_url: 'string',
    git_tags_url: 'string',
    git_refs_url: 'string',
    trees_url: 'string',
    statuses_url: 'string',
    languages_url: 'string',
    stargazers_url: 'string',
    contributors_url: 'string',
    subscribers_url: 'string',
    subscription_url: 'string',
    commits_url: 'string',
    git_commits_url: 'string',
    comments_url: 'string',
    issue_comment_url: 'string',
    contents_url: 'string',
    compare_url: 'string',
    merges_url: 'string',
    archive_url: 'string',
    downloads_url: 'string',
    issues_url: 'string',
    pulls_url: 'string',
    milestones_url: 'string',
    notifications_url: 'string',
    labels_url: 'string',
    releases_url: 'string',
    deployments_url: 'string',
    created_at: 'datetime',
    updated_at: 'datetime',
    pushed_at: 'datetime',
    git_url: 'string',
    ssh_url: 'string',
    clone_url: 'string',
    svn_url: 'string',
    homepage: 'string',
    size: 'float',
    stargazers_count: 'float',
    watchers_count: 'float',
    language: 'string',
    has_issues: 'boolean',
    has_projects: 'boolean',
    has_downloads: 'boolean',
    has_wiki: 'boolean',
    has_pages: 'boolean',
    forks_count: 'float',
    mirror_url: 'string',
    archived: 'boolean',
    disabled: 'boolean',
    open_issues_count: 'float',
    license: ELARA.StructType({
        key: 'string',
        name: 'string',
        spdx_id: 'string',
        url: 'string',
        node_id: 'string',
    }),
    forks: 'float',
    open_issues: 'float',
    watchers: 'float',
    default_branch: 'string',
    permissions: ELARA.StructType({
        admin: 'boolean',
        maintain: 'boolean',
        push: 'boolean',
        triage: 'boolean',
        pull: 'boolean',
    }),
}));

// ...

export default ELARA.RestApiSourceSchema({
    name: "Rest",
    authorisation: {
        // ...
    },
    endpoints: {
        Repos: {
            rows_request: {
                url: ELARA.StringJoin`https://api.github.com/users/${ELARA.Environment("GITHUB_USER")}/repos`,
                method: 'GET',
                accept: 'application/json',
                headers: ELARA.Struct({
                    Accept: ELARA.Const("application/vnd.github.v3+json"),
                    Authorization: ELARA.StringJoin`token ${ELARA.GetField(ELARA.Variable("token", rest_token_response_body_type), "access_token")}`
                }),
                content: 'application/json',
            },
            rows_response: {
                status_code_variable: ELARA.Variable("status_code", 'integer'),
                status_text_variable: ELARA.Variable("status_text", 'string'),
                headers: ELARA.Parse(ELARA.Variable("headers", rest_repos_response_headers_type)),
                headers_variable: ELARA.Variable("headers", rest_repos_response_headers_type),
                body: ELARA.Parse(ELARA.Variable("body", rest_repos_response_body_type)),
                body_variable: ELARA.Variable("body", rest_repos_response_body_type),
                value: ELARA.Variable("body", rest_repos_response_body_type),
            },
        }
    }
})
```

### Adding sub-queries
Further to the above, we can add sub queries to the `Repos` query which will be requested for each row returned. We will add queries for the repository `detail`, `contributors` and `tags` as functions of the `Repos` response fields:

```typescript
import * as ELARA from "@elaraai/edk/lib"

//...

export default ELARA.RestApiSourceSchema({
    name: "Rest",
    authorisation: {
        // ...
    },
    endpoints: {
        Repos: {
            // ...
            elements: {
                detail: {
                    request: {
                        url: ELARA.StringJoin`https://api.github.com/repos/${ELARA.Environment("GITHUB_USER")}/${ELARA.Variable("name", 'string')}`,
                        method: 'GET',
                        accept: 'application/json',
                        headers: ELARA.Struct({
                            Accept: ELARA.Const("application/vnd.github.v3+json"),
                            Authorization: ELARA.StringJoin`token ${ELARA.GetField(ELARA.Variable("token", rest_token_response_body_type), "access_token")}`
                        }),
                        content: 'application/x-www-form-urlencoded',
                    },
                },
                contributors: {
                    request: {
                        url: ELARA.StringJoin`https://api.github.com/repos/${ELARA.Environment("GITHUB_USER")}/${ELARA.Variable("name", 'string')}/contributors`,
                        method: 'GET',
                        accept: 'application/json',
                        headers: ELARA.Struct({
                            Accept: ELARA.Const("application/vnd.github.v3+json"),
                            Authorization: ELARA.StringJoin`token ${ELARA.GetField(ELARA.Variable("token", rest_token_response_body_type), "access_token")}`
                        }),
                        content: 'application/x-www-form-urlencoded',
                    },
                },
                tags: {
                    request: {
                        url: ELARA.StringJoin`https://api.github.com/repos/${ELARA.Environment("GITHUB_USER")}/${ELARA.Variable("name", 'string')}/tags`,
                        method: 'GET',
                        accept: 'application/json',
                        headers: ELARA.Struct({
                            Accept: ELARA.Const("application/vnd.github.v3+json"),
                            Authorization: ELARA.StringJoin`token ${ELARA.GetField(ELARA.Variable("token", rest_token_response_body_type), "access_token")}`
                        }),
                        content: 'application/x-www-form-urlencoded',
                    },
                }
            }
        }
    }
})
```

Using the same process as earlier we can use the edk detection to infer the authenticated request responses for the sub-queries, with the following command `edk-io detect rest --asset rest.source --defaults`.

## Adding application
Now that we have a complete datasource, the application can be added with the following command ```edk add plugin --name "Application" --def_dir src/plugin```. The plugin, a ```SuperUser``` and related environment variables are added as:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, DataSourcePlugin, EnvironmentVariable, SuperUser } from "@elaraai/edk/lib"

import rest from "../../gen/rest.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Rest Datasource",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [rest]
            })
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ],
        environments: [
            EnvironmentVariable({ name: 'GITHUB_CLIENT_ID' }),
            EnvironmentVariable({ name: 'GITHUB_CLIENT_SECRET' }),
            EnvironmentVariable({ name: 'GITHUB_USER' }),
        ]
    })
)
```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API](https://elaraai.github.io/docs/edk): programmatic api for the cli functionality