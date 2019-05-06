package com.example.dic;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class DeleteDb extends AppCompatActivity {
    private MyDatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.delete_db);


        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);

        Button deleteButton = (Button) findViewById(R.id.delete_data);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                db.delete("WORD", "id > ?", new String[] { "0" });

            }
        });
        Button checks = (Button) findViewById(R.id.check);
        checks.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                SQLiteDatabase db = dbHelper.getWritableDatabase();
                // 查询Book表中所有的数据
                Cursor cursor = db.query("WORD", null, null, null, null, null, null ,"1");
                if (cursor.moveToFirst()) {

                    do {

                        // 遍历Cursor对象，取出数据并打印
                        String name = cursor.getString(cursor.getColumnIndex("word"));
                        String author = cursor.getString(cursor.getColumnIndex("awa"));
                        int pages = cursor.getInt(cursor.getColumnIndex("status"));

                        Log.d("MainActivity", "book name is " + name);
                        Log.d("MainActivity", "book author is " + author);
                        Log.d("MainActivity", "book pages is " + pages);





                    } while (cursor.moveToNext());


                }

                cursor.close();
            }
        });

    }


}
