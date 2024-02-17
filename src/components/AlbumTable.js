const AlbumTable = (props) => {
  const {song, title} = props;

  return (
    <table>
      <tr>
        <th>#</th>
        <th>track</th>
      </tr>
      {song?.length > 0 && song.map((songItem, index) => {
        return(
          <tr>
            <td>{index + 1}</td>
            <td>{title}</td>
          </tr>
        )
      })}
    </table>
  );
}

export {AlbumTable};
