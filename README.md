You can get the uri of music / podcast the user is listening currently.

On the browser, the first button is to login with spotify.
Once logged in, you can send uri of current playing to server by hitting the button.

You can see the uri on the server terminal.
You can see the access token, which is used to get the uri, and the uri on the developer's console of this page.
When the user is not listening to anything, no uri is sent to the server.

The client id and the client secret of your app are necessary to use this code.

最初のボタンで、ユーザーはspotifyのサイトに誘導され、そこで自分のデータを使ってよいという同意をできます。
同意ボタンを押した上で、二つ目のボタンを押すと、データサーバーターミナルに今、ユーザーが聞いている音楽・ポッドキャストのURIが出ます。
ブラウザーの開発者コンソールにもアクセストークンとURIが出るようにしています。

ユーザーが何も聞いていないときに二つ目のボタンを押した場合、トークンは得られ、開発者コンソールにも表示されますが、URIは存在しないため、サーバーには何も送られません。

このコードを使うにはspotifyで自分のアプリを設定し、そこで得られたclient idとclient secretを使う必要があります。

