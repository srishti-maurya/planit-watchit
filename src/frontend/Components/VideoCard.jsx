export function getThumbnail(id) {
  return `https://i.ytimg.com/vi/${id}/hq720.jpg`;
}
export function getCreatorImg(id) {
  return `https://yt3.ggpht.com/ytc/${id}`;
}

export function VideoCard({ video }) {
  return (
    <div className="card-container-vertical">
      <img
        src={getThumbnail(video._id)}
        alt={video.title}
        className="img-responsive video-thumbnail"
      />
      <div className="card-body-vertical">
        <img
          src={getCreatorImg(video.creatorId)}
          alt={video.title}
          className="avatar avatar-sm"
        />
        <div className="card-vertical-section">
          <div className="text-xs card-heading font-regular">{video.title}</div>
          <div className="text-xs color-text-grey">{video.creator}</div>
          <div className="text-xs color-text-grey">{video.views} views</div>
        </div>
      </div>
    </div>
  );
}
