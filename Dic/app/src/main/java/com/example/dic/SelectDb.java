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
    private  ArrayList<String> pid ;
    private  Integer deleteId;
    private  Button deleteButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.select_db);
        tips = findViewById(R.id.atips);
        rdgp = findViewById(R.id.aradioGp);
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);

        sqt();

        deleteButton = findViewById(R.id.delete_data);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                if(deleteId != null){


                String idx = Integer.toString(deleteId);
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                db.delete("WORD", "id  = ?", new String[]{idx});
                tips.setText("");
                remo();
                }
                deleteId = null;
            }


        });

    }


    public void remo(){
        if(rdgp.getChildCount() > 0 ){


            for (int i = 0; i < rdgp.getChildCount(); i++) {
                RadioButton tv = (RadioButton) rdgp.getChildAt(i);
                rdgp.removeView(tv);
            }

            sqt();
        }
    }

    public void sqt(){

        title = new ArrayList<> () ;
        pid = new ArrayList<> () ;
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        // 查询Book表中所有的数据
        String lim ="190";
        Cursor cursor = db.query("WORD", null, null, null, null, null, null,lim);
        if (cursor.moveToFirst()) {

            do {

                // 遍历Cursor对象，取出数据并打印
                String name = cursor.getString(cursor.getColumnIndex("word"));

                int pages = cursor.getInt(cursor.getColumnIndex("id"));
                String ids = Integer.toString(pages);

                  title.add(name);
                  pid.add(ids);

                Log.d("MainActivity", "title " + title.size());

            } while (cursor.moveToNext());

            addview();
        }else{
            tips.setText("数据空");
            deleteButton.setVisibility(View.GONE);
        }

        cursor.close();
    }




    public void addview() {



         for (int i = 0; i < title.size(); i++) {


            RadioButton btn = new RadioButton(this);
            btn.setPadding(30, 38, 20, 38);
            btn.setButtonDrawable(new StateListDrawable());

            btn.setText(title.get(i)+"--"+Integer.parseInt(pid.get(i)));

            btn.setId(Integer.parseInt(pid.get(i)));
            RadioGroup.LayoutParams layoutP = new RadioGroup.LayoutParams(
                    RadioGroup.LayoutParams.MATCH_PARENT, RadioGroup.LayoutParams.MATCH_PARENT);
            btn.setLayoutParams(layoutP);

            btn.setOnClickListener(new View.OnClickListener() {

                @Override
                public void onClick(View v) {
                    RadioButton ts = (RadioButton) v;
                    String vs = ts.getText().toString();
                    Integer ix = ts.getId();
                    deleteId = ix;
                    tips.setText(vs+ix);




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
