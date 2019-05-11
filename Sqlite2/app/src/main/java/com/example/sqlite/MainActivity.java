package com.example.sqlite;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private  Sqlite dbHelper;
    private  int x;
    private LinearLayout rdgp;
    private TextView tips;
    private ArrayList<String> title ;
    private  ArrayList<String> pid ;
    private  ArrayList<String> wids ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        tips = findViewById(R.id.atips);
        rdgp = findViewById(R.id.aradioGp);

        dbHelper = new Sqlite(this, "BookStore.db", null, 2);

        sqt();

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                sqt();

            }
        });

    }

    public void sqt(){
        removeView();
        title = new ArrayList<>() ;
        pid = new ArrayList<> () ;
        wids = new ArrayList<> () ;
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        // 查询Book表中所有的数据
        String lim = "4";
        String rdm = "RANDOM()";

        Cursor cursor = db.query("oeDict", null, null, null, null, null, rdm,lim);
        if (cursor.moveToFirst()) {

            do {

                // 遍历Cursor对象，取出数据并打印
                String name = cursor.getString(cursor.getColumnIndex("word"));
                String expl = cursor.getString(cursor.getColumnIndex("meaning"));
                int word_id = cursor.getInt(cursor.getColumnIndex("word_id"));

                wids.add(Integer.toString(word_id));
                title.add(name);
                pid.add(expl);


            } while (cursor.moveToNext());

            addView();

        }else{
            tips.setText("数据为空");

        }

        cursor.close();
    }


    public void addView() {
            x =(int)(Math.random()*4);
            tips.setText(title.get(x)+"~~~"+ x);
            for (int i = 0; i < title.size(); i++) {
                TextView btn = new TextView(this);
                btn.setPadding(30, 38, 20, 38);
                btn.setId(i);
                btn.setText(title.get(i)+"--"+ pid.get(i));
                rdgp.addView(btn);
                btn.setOnClickListener(new View.OnClickListener(){
                    @Override
                    public void onClick(View view) {

                        int its = view.getId();
                        for (int i = 0; i < rdgp.getChildCount(); i++) {
                            TextView tv = (TextView) rdgp.getChildAt(i);
                            if (view == tv){
                                if (x == its) {
                                    tv.setTextColor(Color.parseColor("#FFFFFF"));
                                    tv.setBackgroundColor(Color.parseColor("#008577"));
                                } else {
                                    tv.setTextColor(Color.parseColor("#FF3030"));
                                    tv.setBackgroundColor(Color.parseColor("#FFB90F"));
                                }
                            } else{
                                tv.setTextColor(Color.GRAY);
                                tv.setBackgroundColor(Color.parseColor("#FFFFFF"));
                            }
                        }
                    }

                });


            }
    }

    public void removeView(){
        View view = null;
        for(int index = rdgp.getChildCount();index >= 0;index --){
            view = rdgp.getChildAt(index);
            if(view != null ){
                rdgp.removeView(view);
            }
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {


        switch(item.getItemId()){
            case R.id.action_settings:
                action_settings();
                break;
            case R.id.create_db:
                create_db();
                break;
            case R.id.import_sql:
                impSql();
                break;
            case R.id.clear_db:
                clearSql();
                break;
            case R.id.clickAnother:
                toastSql();
                break;

            default:
        }
        return true;
    }
    public void action_settings(){
        Toast.makeText(this,"Settings",Toast.LENGTH_LONG).show();
    }
    public void create_db(){


        dbHelper.getWritableDatabase();

    }
    public void toastSql(){
        Toast.makeText(this,"sfsf",Toast.LENGTH_LONG).show();

    }

    public  void clearSql(){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        db.delete("oeDict",null,null);

    }
    public void impSql() {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues values = new ContentValues();






        values.put("word_id",1);
        values.put("letter","a");
        values.put("word","A-");
        values.put("meaning"," prefix (also an- before a vowel sound) not, without (amoral). [greek]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",2);
        values.put("letter","a");
        values.put("word","Aa");
        values.put("meaning"," abbr. 1 automobile association. 2 alcoholics anonymous. 3 anti-aircraft.");
        db.insert("oeDict", null, values);
        values.clear();



        values.put("word_id",3);
        values.put("letter","a");
        values.put("word","Aardvark");
        values.put("meaning"," n. Mammal with a tubular snout and a long tongue, feeding on termites. [afrikaans]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",4);
        values.put("letter","a");
        values.put("word","Ab-");
        values.put("meaning"," prefix off, away, from (abduct). [latin]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",5);
        values.put("letter","a");
        values.put("word","Aback");
        values.put("meaning"," adv.  take aback surprise, disconcert. [old english: related to *a2]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",6);
        values.put("letter","a");
        values.put("word","Abacus");
        values.put("meaning"," n. (pl. -cuses) 1 frame with wires along which beads are slid for calculating. 2 archit. Flat slab on top of a capital. [latin from greek from hebrew]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",7);
        values.put("letter","a");
        values.put("word","Abaft");
        values.put("meaning"," naut. adv. In the stern half of a ship. prep. Nearer the stern than. [from *a2, -baft: see *aft]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",8);
        values.put("letter","a");
        values.put("word","Abandon");
        values.put("meaning"," v. 1 give up. 2 forsake, desert. 3 (often foll. By to; often refl.) Yield to a passion, another's control, etc. n. Freedom from inhibitions.  abandonment n. [french: related to *ad-, *ban]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",9);
        values.put("letter","a");
        values.put("word","Abandoned");
        values.put("meaning"," adj. 1 deserted, forsaken. 2 unrestrained, profligate.");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",10);
        values.put("letter","a");
        values.put("word","Abase");
        values.put("meaning"," v. (-sing) (also refl.) Humiliate, degrade.  abasement n. [french: related to *ad-, *base2]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",11);
        values.put("letter","a");
        values.put("word","Abashed");
        values.put("meaning"," predic. Adj. Embarrassed, disconcerted. [french es- *ex-1, baÃ¯r astound]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",12);
        values.put("letter","a");
        values.put("word","Abate");
        values.put("meaning"," v. (-ting) make or become less strong etc.; diminish.  abatement n. [french abatre from latin batt(u)o beat]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",13);
        values.put("letter","a");
        values.put("word","Abattoir");
        values.put("meaning"," n. Slaughterhouse. [french abatre fell, as *abate]");
        db.insert("oeDict", null, values);
        values.clear();

        values.put("word_id",14);
        values.put("letter","a");
        values.put("word","Abbacy");
        values.put("meaning"," n. (pl. -ies) office or jurisdiction of an abbot or abbess. [latin: related to *abbot]");
        db.insert("oeDict", null, values);
        values.clear();







    }
}