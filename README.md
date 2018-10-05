# liferay-react-demo

## Setup

### Liferay Portal

Need Liferay 7.1+ and the `com.liferay.frontend.js.portlet.extender` module

### Deploying the Portlet

1. Navigate to [portlet](./portlet)
2. Install: `npm install`
3. Set `liferayDir` in [.npmbuildrc](./portlet/.npmbuildrc)
4. Set `contentSpaceId` in [liferay-config](./portlet/src/util/liferay-config.js)
5. Deploy: `npm run deploy`

### Starting Standalone

1. Navigate to [standalone](./standalone)
2. Install: `npm install`
3. Create OAuth2 application in Portal. [Portal OAuth2 Setup](./oauth-setup.png)
4. Set `clientId`(from OAuth app) and `contentSpaceId` in [liferay-config](./standalone/src/util/liferay-config.js)
5. Start: `npm run start`

## Caveats

### Portlet

-   Have to disable SPA module (Liferay Frontend JS SPA Web)
-   Had to use [hash routing](https://reacttraining.com/react-router/web/api/HashRouter) because browser history routing breaks after page reload.
    -   It'd be great if there was some sort of manifest that the module could provide that would determine which routes portal should ignore.
-   Unable to use custom webpack loaders or custom build process
-   Unable to use dynamic imports and [code splitting](https://webpack.js.org/guides/code-splitting/)
-   Requires some internal knowledge of `liferay-npm-build-support` and `liferay-npm-bundler`

### Standalone

-   No CORS support means we need a proxy server (Might be fixed by [JIRA: OAUTH2-207](https://issues.liferay.com/browse/OAUTH2-207))
-   Authentication for images required ajax requests. [See AsyncImage Component](./standalone/src/components/AsyncImage.js)
    -   There might be another way around this.

### Overall Thoughts

-   `/o/api` was great for GET requests and reading resources but wasn't fully baked out enough for POSTing and PUTing.
-   `/o/api` was easy to discover by navigating through the urls
-   `/api/jsonws` filled in for the gaps that `/o/api` was missing
-   Adding a file via `Liferay.Service` didn't work, which means I had to create a separate axios request. [See Upload Page](./standalone/src/pages/photos/Upload.js)
-   There were a lot of required parameters that I didn't find helpful when using `/api/jsonws`.
-   I couldn't get [create-react-app](https://github.com/facebook/create-react-app) working in the portlet context.I tried adding the proper packages to the package.json so that it deployed as a portlet but the build version of CRA seemed inconsistant with what liferay and the bundler wanted.
