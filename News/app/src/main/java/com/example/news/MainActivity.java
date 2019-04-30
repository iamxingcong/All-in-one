package com.example.news;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private LinearLayout mContainer;

    private RequestQueue mQueue;
    private RequestQueue queue;
    private JSONArray jsar;
    FrameLayout frameLayout;
    private  ListView lv;
    private  String urls ="https://shop.miido.com.cn/schoolDetaile/getExperienceByMid.action?merchanId=";
    private  String url = "https://shop.miido.com.cn/schoolDetaile/getAllSchoolInfo.action";
    private  JSONArray row;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lv =  findViewById(R.id.listview);

        mContainer = findViewById(R.id.container);
        frameLayout=(FrameLayout)findViewById(R.id.frameLayout);

        mQueue = Volley.newRequestQueue(this);

        jsonParse();

    }

    public void addView() {

        try {
            for (int i = 0; i < jsar.length(); i++) {
                JSONObject employee = jsar.getJSONObject(i);
                String title = employee.getString("schoolname");
                String id = employee.getString("merchanid");

                TextView child = new TextView(this);
                child.setText(title);
                child.setTextSize(20);
                child.setId(Integer.parseInt(id));

                child.setPadding(20,10,20,10);
                child.setClickable(true);

                child.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Toast.makeText(MainActivity.this,String.valueOf(view.getId()),Toast.LENGTH_SHORT).show();
                        String its = String.valueOf(view.getId());
                        geTtrl(its);
                    }
                });


                mContainer.addView(child);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        };



    }

    private void jsonParse() {



        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            jsar = response.getJSONArray("datainfo");

                            addView();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });

        mQueue.add(request);
    }


    private void geTtrl(String its){
        Toast.makeText(MainActivity.this,its+"f",Toast.LENGTH_SHORT).show();


        // Instantiate the RequestQueue.
        queue = Volley.newRequestQueue(this);

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urls+its,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try{
                            JSONObject uobj = new JSONObject(response);
                           JSONObject item = uobj.getJSONObject("datainfo");
                            row = item.getJSONArray("recordList");

                            JSONObject jsobj = null;
                            String title[] = new String[row.length()];

                            if(row.length() == 0){
                                Toast.makeText(MainActivity.this,"blank!!!!!!!!",Toast.LENGTH_LONG).show();
                                return ;
                            };
                            for(int i = 0; i < row.length(); i++){

                                jsobj = row.getJSONObject(i);
                                title[i] = jsobj.getString("title");
                            };

                            String xt [] = title;
                            ArrayAdapter adapter = new ArrayAdapter<>(MainActivity.this,R.layout.item,xt);
                            lv.setAdapter(adapter);

                            Toast.makeText(MainActivity.this,"okay",Toast.LENGTH_SHORT).show();

                        }catch(final JSONException e){
                            Toast.makeText(MainActivity.this,"error",Toast.LENGTH_SHORT).show();
                        }


                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(MainActivity.this,"error occured",Toast.LENGTH_SHORT).show();
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);

    }

}



