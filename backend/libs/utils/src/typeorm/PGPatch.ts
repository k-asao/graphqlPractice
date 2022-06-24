import pg from 'pg';

// TODO: インターセプターなどで必ず実行するように対応する
export const patchDateParser = () => {
  // 'timestamp without timezone' の型を使用した際に
  // 強制的にUTCでパースされてしまうためJSTでパースするように対応。
  // https://github.com/typeorm/typeorm/issues/2622#issuecomment-476416712
  pg.types.setTypeParser(
    1114,
    (stringValue) => new Date(`${stringValue}+0900`),
  );
};
