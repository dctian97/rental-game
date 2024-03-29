
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/gamelist.mjs
var gamelist_default = async () => {
  const data = [
    {
      \u30B2\u30FC\u30E0id: 4,
      \u30BF\u30A4\u30C8\u30EB: "\u30BC\u30EB\u30C0\u306E\u4F1D\u8AAC \u30C6\u30A3\u30A2\u30FC\u30BA \u30AA\u30D6 \u30B6 \u30AD\u30F3\u30B0\u30C0\u30E0",
      \u30C7\u30D9\u30ED\u30C3\u30D1\u30FC: "\u4EFB\u5929\u5802",
      \u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0: "Nintendo Switch",
      \u5728\u5EAB\u6570: 1,
      \u767A\u58F2\u65E5: "2023-05-12",
      \u91D1\u984D: 3500
    },
    {
      \u30B2\u30FC\u30E0id: 2,
      \u30BF\u30A4\u30C8\u30EB: "\u30DB\u30B0\u30EF\u30FC\u30C4\u30FB\u30EC\u30AC\u30B7",
      \u30C7\u30D9\u30ED\u30C3\u30D1\u30FC: "WB Games",
      \u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0: "PS5",
      \u5728\u5EAB\u6570: 3,
      \u767A\u58F2\u65E5: "2023-02-10",
      \u91D1\u984D: 2e3
    },
    {
      \u30B2\u30FC\u30E0id: 6,
      \u30BF\u30A4\u30C8\u30EB: "Halo Infinite",
      \u30C7\u30D9\u30ED\u30C3\u30D1\u30FC: "MicroSoft",
      \u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0: "Xbox S",
      \u5728\u5EAB\u6570: 3,
      \u767A\u58F2\u65E5: "2021-12-09",
      \u91D1\u984D: 1e3
    },
    {
      \u30B2\u30FC\u30E0id: 5,
      \u30BF\u30A4\u30C8\u30EB: "FINAL FANTASY XVI\uFF08\u30D5\u30A1\u30A4\u30CA\u30EB\u30D5\u30A1\u30F3\u30BF\u30B8\u30FC16\uFF09",
      \u30C7\u30D9\u30ED\u30C3\u30D1\u30FC: "SQUARE ENIX",
      \u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0: "PS5",
      \u5728\u5EAB\u6570: 10,
      \u767A\u58F2\u65E5: "2023-06-22",
      \u91D1\u984D: 3e3
    },
    {
      \u30B2\u30FC\u30E0id: 3,
      \u30BF\u30A4\u30C8\u30EB: "\u5927\u4E71\u95D8\u30B9\u30DE\u30C3\u30B7\u30E5\u30D6\u30E9\u30B6\u30FC\u30BA SPECIAL",
      \u30C7\u30D9\u30ED\u30C3\u30D1\u30FC: "\u4EFB\u5929\u5802",
      \u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0: "Nintendo Switch",
      \u5728\u5EAB\u6570: 2,
      \u767A\u58F2\u65E5: "2018-12-07",
      \u91D1\u984D: 1e3
    },
    {
      \u30B2\u30FC\u30E0id: 1,
      \u30BF\u30A4\u30C8\u30EB: "\u30A2\u30D0\u30BF\u30FC:\u30D5\u30ED\u30F3\u30C6\u30A3\u30A2\u30FB\u30AA\u30D6\u30FB\u30D1\u30F3\u30C9\u30E9",
      \u30C7\u30D9\u30ED\u30C3\u30D1\u30FC: "Ubisoft",
      \u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0: "PS5",
      \u5728\u5EAB\u6570: 5,
      \u767A\u58F2\u65E5: "2023-12-07",
      \u91D1\u984D: 4e3
    },
    {
      \u30B2\u30FC\u30E0id: 20,
      \u30BF\u30A4\u30C8\u30EB: "Marvel's Spider-Man: Miles Morales",
      \u30C7\u30D9\u30ED\u30C3\u30D1\u30FC: "SONY",
      \u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0: "PS5",
      \u5728\u5EAB\u6570: 2,
      \u767A\u58F2\u65E5: "2020-11-12",
      \u91D1\u984D: 3e3
    }
  ];
  return new Response(JSON.stringify(data));
};
export {
  gamelist_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvZ2FtZWxpc3QubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHUzMEIyXHUzMEZDXHUzMEUwaWQ6IDQsXHJcbiAgICAgICAgICAgIFx1MzBCRlx1MzBBNFx1MzBDOFx1MzBFQjogXCJcdTMwQkNcdTMwRUJcdTMwQzBcdTMwNkVcdTRGMURcdThBQUMgXHUzMEM2XHUzMEEzXHUzMEEyXHUzMEZDXHUzMEJBIFx1MzBBQVx1MzBENiBcdTMwQjYgXHUzMEFEXHUzMEYzXHUzMEIwXHUzMEMwXHUzMEUwXCIsXHJcbiAgICAgICAgICAgIFx1MzBDN1x1MzBEOVx1MzBFRFx1MzBDM1x1MzBEMVx1MzBGQzogXCJcdTRFRkJcdTU5MjlcdTU4MDJcIixcclxuICAgICAgICAgICAgXHUzMEQ3XHUzMEU5XHUzMEMzXHUzMEM4XHUzMEQ1XHUzMEE5XHUzMEZDXHUzMEUwOiBcIk5pbnRlbmRvIFN3aXRjaFwiLFxyXG4gICAgICAgICAgICBcdTU3MjhcdTVFQUJcdTY1NzA6IDEsXHJcbiAgICAgICAgICAgIFx1NzY3QVx1NThGMlx1NjVFNTogXCIyMDIzLTA1LTEyXCIsXHJcbiAgICAgICAgICAgIFx1OTFEMVx1OTg0RDogMzUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcdTMwQjJcdTMwRkNcdTMwRTBpZDogMixcclxuICAgICAgICAgICAgXHUzMEJGXHUzMEE0XHUzMEM4XHUzMEVCOiBcIlx1MzBEQlx1MzBCMFx1MzBFRlx1MzBGQ1x1MzBDNFx1MzBGQlx1MzBFQ1x1MzBBQ1x1MzBCN1wiLFxyXG4gICAgICAgICAgICBcdTMwQzdcdTMwRDlcdTMwRURcdTMwQzNcdTMwRDFcdTMwRkM6IFwiV0IgR2FtZXNcIixcclxuICAgICAgICAgICAgXHUzMEQ3XHUzMEU5XHUzMEMzXHUzMEM4XHUzMEQ1XHUzMEE5XHUzMEZDXHUzMEUwOiBcIlBTNVwiLFxyXG4gICAgICAgICAgICBcdTU3MjhcdTVFQUJcdTY1NzA6IDMsXHJcbiAgICAgICAgICAgIFx1NzY3QVx1NThGMlx1NjVFNTogXCIyMDIzLTAyLTEwXCIsXHJcbiAgICAgICAgICAgIFx1OTFEMVx1OTg0RDogMjAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcdTMwQjJcdTMwRkNcdTMwRTBpZDogNixcclxuICAgICAgICAgICAgXHUzMEJGXHUzMEE0XHUzMEM4XHUzMEVCOiBcIkhhbG8gSW5maW5pdGVcIixcclxuICAgICAgICAgICAgXHUzMEM3XHUzMEQ5XHUzMEVEXHUzMEMzXHUzMEQxXHUzMEZDOiBcIk1pY3JvU29mdFwiLFxyXG4gICAgICAgICAgICBcdTMwRDdcdTMwRTlcdTMwQzNcdTMwQzhcdTMwRDVcdTMwQTlcdTMwRkNcdTMwRTA6IFwiWGJveCBTXCIsXHJcbiAgICAgICAgICAgIFx1NTcyOFx1NUVBQlx1NjU3MDogMyxcclxuICAgICAgICAgICAgXHU3NjdBXHU1OEYyXHU2NUU1OiBcIjIwMjEtMTItMDlcIixcclxuICAgICAgICAgICAgXHU5MUQxXHU5ODREOiAxMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFx1MzBCMlx1MzBGQ1x1MzBFMGlkOiA1LFxyXG4gICAgICAgICAgICBcdTMwQkZcdTMwQTRcdTMwQzhcdTMwRUI6IFwiRklOQUwgRkFOVEFTWSBYVklcdUZGMDhcdTMwRDVcdTMwQTFcdTMwQTRcdTMwQ0FcdTMwRUJcdTMwRDVcdTMwQTFcdTMwRjNcdTMwQkZcdTMwQjhcdTMwRkMxNlx1RkYwOVwiLFxyXG4gICAgICAgICAgICBcdTMwQzdcdTMwRDlcdTMwRURcdTMwQzNcdTMwRDFcdTMwRkM6IFwiU1FVQVJFIEVOSVhcIixcclxuICAgICAgICAgICAgXHUzMEQ3XHUzMEU5XHUzMEMzXHUzMEM4XHUzMEQ1XHUzMEE5XHUzMEZDXHUzMEUwOiBcIlBTNVwiLFxyXG4gICAgICAgICAgICBcdTU3MjhcdTVFQUJcdTY1NzA6IDEwLFxyXG4gICAgICAgICAgICBcdTc2N0FcdTU4RjJcdTY1RTU6IFwiMjAyMy0wNi0yMlwiLFxyXG4gICAgICAgICAgICBcdTkxRDFcdTk4NEQ6IDMwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHUzMEIyXHUzMEZDXHUzMEUwaWQ6IDMsXHJcbiAgICAgICAgICAgIFx1MzBCRlx1MzBBNFx1MzBDOFx1MzBFQjogXCJcdTU5MjdcdTRFNzFcdTk1RDhcdTMwQjlcdTMwREVcdTMwQzNcdTMwQjdcdTMwRTVcdTMwRDZcdTMwRTlcdTMwQjZcdTMwRkNcdTMwQkEgU1BFQ0lBTFwiLFxyXG4gICAgICAgICAgICBcdTMwQzdcdTMwRDlcdTMwRURcdTMwQzNcdTMwRDFcdTMwRkM6IFwiXHU0RUZCXHU1OTI5XHU1ODAyXCIsXHJcbiAgICAgICAgICAgIFx1MzBEN1x1MzBFOVx1MzBDM1x1MzBDOFx1MzBENVx1MzBBOVx1MzBGQ1x1MzBFMDogXCJOaW50ZW5kbyBTd2l0Y2hcIixcclxuICAgICAgICAgICAgXHU1NzI4XHU1RUFCXHU2NTcwOiAyLFxyXG4gICAgICAgICAgICBcdTc2N0FcdTU4RjJcdTY1RTU6IFwiMjAxOC0xMi0wN1wiLFxyXG4gICAgICAgICAgICBcdTkxRDFcdTk4NEQ6IDEwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHUzMEIyXHUzMEZDXHUzMEUwaWQ6IDEsXHJcbiAgICAgICAgICAgIFx1MzBCRlx1MzBBNFx1MzBDOFx1MzBFQjogXCJcdTMwQTJcdTMwRDBcdTMwQkZcdTMwRkM6XHUzMEQ1XHUzMEVEXHUzMEYzXHUzMEM2XHUzMEEzXHUzMEEyXHUzMEZCXHUzMEFBXHUzMEQ2XHUzMEZCXHUzMEQxXHUzMEYzXHUzMEM5XHUzMEU5XCIsXHJcbiAgICAgICAgICAgIFx1MzBDN1x1MzBEOVx1MzBFRFx1MzBDM1x1MzBEMVx1MzBGQzogXCJVYmlzb2Z0XCIsXHJcbiAgICAgICAgICAgIFx1MzBEN1x1MzBFOVx1MzBDM1x1MzBDOFx1MzBENVx1MzBBOVx1MzBGQ1x1MzBFMDogXCJQUzVcIixcclxuICAgICAgICAgICAgXHU1NzI4XHU1RUFCXHU2NTcwOiA1LFxyXG4gICAgICAgICAgICBcdTc2N0FcdTU4RjJcdTY1RTU6IFwiMjAyMy0xMi0wN1wiLFxyXG4gICAgICAgICAgICBcdTkxRDFcdTk4NEQ6IDQwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHUzMEIyXHUzMEZDXHUzMEUwaWQ6IDIwLFxyXG4gICAgICAgICAgICBcdTMwQkZcdTMwQTRcdTMwQzhcdTMwRUI6IFwiTWFydmVsJ3MgU3BpZGVyLU1hbjogTWlsZXMgTW9yYWxlc1wiLFxyXG4gICAgICAgICAgICBcdTMwQzdcdTMwRDlcdTMwRURcdTMwQzNcdTMwRDFcdTMwRkM6IFwiU09OWVwiLFxyXG4gICAgICAgICAgICBcdTMwRDdcdTMwRTlcdTMwQzNcdTMwQzhcdTMwRDVcdTMwQTlcdTMwRkNcdTMwRTA6IFwiUFM1XCIsXHJcbiAgICAgICAgICAgIFx1NTcyOFx1NUVBQlx1NjU3MDogMixcclxuICAgICAgICAgICAgXHU3NjdBXHU1OEYyXHU2NUU1OiBcIjIwMjAtMTEtMTJcIixcclxuICAgICAgICAgICAgXHU5MUQxXHU5ODREOiAzMDAwXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbn07Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU8sbUJBQVEsWUFBWTtBQUN2QixRQUFNLE9BQU87QUFBQSxJQUNUO0FBQUEsTUFDSSxzQkFBTztBQUFBLE1BQ1AsMEJBQU07QUFBQSxNQUNOLHNDQUFRO0FBQUEsTUFDUixrREFBVTtBQUFBLE1BQ1Ysb0JBQUs7QUFBQSxNQUNMLG9CQUFLO0FBQUEsTUFDTCxjQUFJO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNJLHNCQUFPO0FBQUEsTUFDUCwwQkFBTTtBQUFBLE1BQ04sc0NBQVE7QUFBQSxNQUNSLGtEQUFVO0FBQUEsTUFDVixvQkFBSztBQUFBLE1BQ0wsb0JBQUs7QUFBQSxNQUNMLGNBQUk7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0ksc0JBQU87QUFBQSxNQUNQLDBCQUFNO0FBQUEsTUFDTixzQ0FBUTtBQUFBLE1BQ1Isa0RBQVU7QUFBQSxNQUNWLG9CQUFLO0FBQUEsTUFDTCxvQkFBSztBQUFBLE1BQ0wsY0FBSTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDSSxzQkFBTztBQUFBLE1BQ1AsMEJBQU07QUFBQSxNQUNOLHNDQUFRO0FBQUEsTUFDUixrREFBVTtBQUFBLE1BQ1Ysb0JBQUs7QUFBQSxNQUNMLG9CQUFLO0FBQUEsTUFDTCxjQUFJO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNJLHNCQUFPO0FBQUEsTUFDUCwwQkFBTTtBQUFBLE1BQ04sc0NBQVE7QUFBQSxNQUNSLGtEQUFVO0FBQUEsTUFDVixvQkFBSztBQUFBLE1BQ0wsb0JBQUs7QUFBQSxNQUNMLGNBQUk7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0ksc0JBQU87QUFBQSxNQUNQLDBCQUFNO0FBQUEsTUFDTixzQ0FBUTtBQUFBLE1BQ1Isa0RBQVU7QUFBQSxNQUNWLG9CQUFLO0FBQUEsTUFDTCxvQkFBSztBQUFBLE1BQ0wsY0FBSTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDSSxzQkFBTztBQUFBLE1BQ1AsMEJBQU07QUFBQSxNQUNOLHNDQUFRO0FBQUEsTUFDUixrREFBVTtBQUFBLE1BQ1Ysb0JBQUs7QUFBQSxNQUNMLG9CQUFLO0FBQUEsTUFDTCxjQUFJO0FBQUEsSUFDUjtBQUFBLEVBQ0o7QUFDQSxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQzVDOyIsCiAgIm5hbWVzIjogW10KfQo=
