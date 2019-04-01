package com.example.a28;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
    ListView lv;
    ArrayList<HashMap<String, String>> contactList;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lv = (ListView) findViewById(R.id.list_view);
        contactList = new ArrayList<>();
    }


    protected void onStart() {
        super.onStart();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://shop.miido.com.cn/index/getkindsItems.action?page=1&classify=0&order=3";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try{
                            JSONObject urlobj = new JSONObject(response);
                            JSONObject itm =  urlobj.getJSONObject("item");
                            JSONArray rows = itm.getJSONArray("rows");

                            for(int i = 0; i < rows.length(); i++){
                                JSONObject t = rows.getJSONObject(i);
                                HashMap<String, String> xt = new HashMap<>();

                                String subtitle = t.getString("image");
                                String title = t.getString("title");
                                String image = t.getString("id");

                                xt.put("subtitle",subtitle);
                                xt.put("title",title);
                                xt.put("image",image);

                                contactList.add(xt);
                            };

                            ListAdapter adapter = new SimpleAdapter(MainActivity.this, contactList,
                                    R.layout.list_row, new String[]{ "image", "title", "subtitle" },
                                    new int[]{ R.id.thumbnail,  R.id.title,  R.id.sub_title });
                            lv.setAdapter(adapter);

                        }catch (final JSONException e){

                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });

        queue.add(stringRequest);
    }
}
