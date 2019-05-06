package com.example.dic;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.graphics.drawable.StateListDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import java.util.ArrayList;

public class SelectDb extends AppCompatActivity {
    private  MyDatabaseHelper dbHelper;
    private  RadioGroup rdgp;
    private  TextView tips;
    private ArrayList<String> title ;
    private  TextView word;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.select_db);
        tips =   findViewById(R.id.atips);
        rdgp =  findViewById(R.id.aradioGp);
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);

        word = findViewById(R.id.aword);

        Button queryButton = (Button) findViewById(R.id.query_data);
        queryButton.setOnClickListener(new View.OnClickListener() {


            @Override
            public void onClick(View v) {
                title = new ArrayList<String> () ;
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                // 查询Book表中所有的数据
                Cursor cursor = db.query("WORD", null, null, null, null, null, null);
                if (cursor.moveToFirst()) {

                    do {

                        // 遍历Cursor对象，取出数据并打印
                        String name = cursor.getString(cursor.getColumnIndex("word"));
                        String author = cursor.getString(cursor.getColumnIndex("awa"));
                        int pages = cursor.getInt(cursor.getColumnIndex("status"));

                        Log.d("MainActivity", "book name is " + name);
                        Log.d("MainActivity", "book author is " + author);
                        Log.d("MainActivity", "book pages is " + pages);

                          title.add("'"+name+"'");

                        Log.d("MainActivity", "title " + title.size());

                    } while (cursor.moveToNext());

                    addview();
                }

                cursor.close();
            }
        });


    };
    public void addview() {


         for (int i = 0; i < title.size(); i++) {


        RadioButton btn = new RadioButton(this);
        btn.setPadding(30, 38, 20, 38);
        btn.setButtonDrawable(new StateListDrawable());
         btn.setText("ljklj"+i);
        RadioGroup.LayoutParams layoutP = new RadioGroup.LayoutParams(
                RadioGroup.LayoutParams.MATCH_PARENT, RadioGroup.LayoutParams.MATCH_PARENT);
        btn.setLayoutParams(layoutP);

        btn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                RadioButton ts = (RadioButton) v;
                String vs = ts.getText().toString();

                tips.setText("this is radioButton " + vs);

                for (int i = 0; i < rdgp.getChildCount(); i++) {
                    RadioButton tv = (RadioButton) rdgp.getChildAt(i);
                    if (v == tv) {
                        tv.setTextColor(Color.WHITE);
                        tv.setBackgroundColor(Color.parseColor("#008577"));


                    } else {
                        tv.setTextColor(Color.BLACK);
                        tv.setBackgroundColor(Color.parseColor("#FFFFFF"));
                    }
                }
            }
        });
        rdgp.addView(btn);


    }
    }
}
