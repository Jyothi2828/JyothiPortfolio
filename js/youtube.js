document.addEventListener('DOMContentLoaded', function() {
    fetchYouTubeData();
});

function fetchYouTubeData() {
    const apiKey = 'AIzaSyB6ThQYsk0zV-WxK23DqH2DYY-xKd3bQP8'; // Your API key
    const channelId = 'UClN1EQx1ntnG5Uv3-nnRbMw'; // Your Channel ID
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const channel = data.items[0];
            const profilePic = channel.snippet.thumbnails.high.url;
            const username = channel.snippet.title;
            const followers = channel.statistics.subscriberCount;
            const videos = channel.statistics.videoCount;

            document.getElementById('youtube-profile-pic').src = profilePic;
            document.getElementById('youtube-username').innerText = username;
            document.getElementById('youtube-followers').innerText = `Followers: ${followers}`;
            document.getElementById('youtube-videos').innerText = `Videos: ${videos}`;
        })
        .catch(error => console.error('Error fetching YouTube data:', error));
}