package com.example.dic;

import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

public class InsertDb extends AppCompatActivity {
    private MyDatabaseHelper dbHelper;
    private EditText awa;
    private EditText awb;
    private EditText awc;
    private EditText awd;

    private EditText word;
    private RadioGroup rDgp;
    private  String rs;
    private  TextView tts;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.insert_db);
        awa = findViewById(R.id.awa);
        awc = findViewById(R.id.awc);
        awb = findViewById(R.id.awb);
        awd = findViewById(R.id.awd);

        word = findViewById(R.id.word);
        rDgp = findViewById(R.id.rDgp);
        tts = (TextView) findViewById(R.id.titleA);
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);

        Button addData =  findViewById(R.id.add_data);
        addData.setOnClickListener(new View.OnClickListener() {


            public void onClick(View v) {

                SQLiteDatabase db = dbHelper.getWritableDatabase();
                ContentValues values = new ContentValues();


                values.put("word", word.getText().toString());
                values.put("awa", awa.getText().toString());
                values.put("awb", awb.getText().toString());
                values.put("awc", awc.getText().toString());
                values.put("awd", awd.getText().toString());
                values.put("status", 0);
                String ok = awd.getText().toString();
                if(ok.length() == 0){
                    tts.setText("不能为空");
                    return;
                }else{
                    tts.setText("建词库");
                }

                for(int i = 0 ;i < rDgp.getChildCount();i++){
                    RadioButton rb = (RadioButton) rDgp.getChildAt(i);
                    if(rb.isChecked()){

                        rs = rb.getText().toString();

                    }
                }
                values.put("ras", rs);

                db.insert("WORD", null, values);
                values.clear();
                word.setText("");
                awa.setText("");
                awb.setText("");
                awc.setText("");
                awd.setText("");


            }
        });

    }
}
