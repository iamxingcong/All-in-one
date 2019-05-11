package com.example.sqlite;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.widget.Toast;

public class Sqlite  extends SQLiteOpenHelper {


    public static final String CREATE_WORD = "create table oeDict("
            + "word_id integer NOT NULL PRIMARY KEY AUTOINCREMENT,"
            +"letter text(2) NOT NULL,"
            +"word  text(50) NOT NULL,"
            +"meaning text(10000) NOT NULL)";


    private Context mContext;

    public Sqlite(Context context, String name,
               SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        mContext = context;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_WORD);

        Toast.makeText(mContext, "Create succeeded", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("drop table if exists oeDict");
        onCreate(db);
    }

}