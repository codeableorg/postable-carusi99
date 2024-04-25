import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES Posts(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);
`);
};

export const down: Migration = async (params) => {
  return params.context.query(`DROP TABLE likes;`);
};
