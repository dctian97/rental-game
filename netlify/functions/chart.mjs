export default async () => {
    const data = [
        {
            "タイトル": "FINAL FANTASY",
            "貸出回数": 1
          },
          {
            "タイトル": "Halo Infinite",
            "貸出回数": 1
          },
          {
            "タイトル": "アバター:フロンティア・オ",
            "貸出回数": 5
          },
          {
            "タイトル": "ゼルダの伝説 ティアーズ ",
            "貸出回数": 1
          },
          {
            "タイトル": "ホグワーツ・レガシ",
            "貸出回数": 3
          },
          {
            "タイトル": "大乱闘スマッシュブラザーズ",
            "貸出回数": 1
          }
    ]
    return new Response(JSON.stringify(data));
};