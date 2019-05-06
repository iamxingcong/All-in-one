package com.example.dic;

import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class InsertDb extends AppCompatActivity {
    private MyDatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.insert_db);

        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);

        Button addData = (Button) findViewById(R.id.add_data);
        addData.setOnClickListener(new View.OnClickListener() {

            int a = 0;
            public void onClick(View v) {
                a++;
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                ContentValues values = new ContentValues();
                // 开始组装第一条数据
                String tss = "so"+String.valueOf(a);
                String soks = "oks"+String.valueOf(a);
                values.put("word", tss);
                values.put("awa", tss);
                values.put("awb", "男的");
                values.put("awc", "女的");
                values.put("awD", "老的");
                values.put("ras", "awa");
                db.insert("WORD", null, values); // 插入第一条数据
                values.clear();
                // 开始组装第二条数据
                values.put("word", soks);
                values.put("awa", soks);
                values.put("awb", "男FFSD的");
                values.put("awc", "女SFDF的");
                values.put("awd", "老SFF的");
                values.put("ras", "awa");
                db.insert("WORD", null, values); // 插入第二条数据
            }
        });

    }
}
