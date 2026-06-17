const BANNER_TEXT = `
   ✦      .   .       *           .         .       ✦    .    .        .      .             .      .             .  +
 .              +   .                .     .    .     .   .        ✦         +      .  .      ✦           *    ✦   .
    | | / / ___/ _ | / |/ / ___/ __/ /       .       +       .    *       ✦    .      .           .     .           .
 +  | |/ / /__/ __ |/    / (_ / _// /__   ✦ .    *   .    .     .       .                        .    +      .
    |___/\\___/_/ |_/_/|_/\\___/___/____/ ©2026      .     +             .                 .                    +   .
         .           *  .         .       .                       .              *                     .
    ✦  The only limit is your imagination!  (ง•\`ω\´•)ว__/  ✦    .    .    *             .      +       *         .
  .       *            .           *     .  .   .  +        .          . +                    ✦  .                .
     +        +     .               .      ✦  .               .                             .                .

`;

export const BANNER_LINES = BANNER_TEXT.split("\n").map((line) =>
  line.trimEnd()
);
